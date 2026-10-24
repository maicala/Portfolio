const http = require('node:http');
const fs = require('node:fs');
const path = require('node:path');
const crypto = require('node:crypto');

const ROOT = __dirname;
const DATA_DIR = process.env.DATA_DIR || path.join(ROOT, 'data');
const DATA_FILE = path.join(DATA_DIR, 'videos.json');
const PASSWORD = process.env.ADMIN_PASSWORD;
const PORT = Number(process.env.PORT || 3000);
const sessions = new Map();
const loginAttempts = new Map();
const SESSION_TTL = 12 * 60 * 60 * 1000;
const MAX_BODY_BYTES = 12_000;

if (!PASSWORD || PASSWORD.length < 12) {
  console.error('Set ADMIN_PASSWORD to a unique secret of at least 12 characters before starting the site.');
  process.exit(1);
}

fs.mkdirSync(DATA_DIR, { recursive: true });
if (!fs.existsSync(DATA_FILE)) fs.writeFileSync(DATA_FILE, '[]\n', { flag: 'wx' });

function json(res, status, body, headers = {}) {
  res.writeHead(status, { 'Content-Type': 'application/json; charset=utf-8', 'Cache-Control': 'no-store', ...headers });
  res.end(JSON.stringify(body));
}

function readVideos() {
  try {
    const value = JSON.parse(fs.readFileSync(DATA_FILE, 'utf8'));
    return Array.isArray(value) ? value : [];
  } catch {
    return [];
  }
}

function originIsSame(req) {
  const origin = req.headers.origin;
  if (!origin) return false;
  try { return new URL(origin).host === req.headers.host; } catch { return false; }
}

function cookieValue(req, name) {
  const cookies = (req.headers.cookie || '').split(';');
  for (const cookie of cookies) {
    const [key, ...parts] = cookie.trim().split('=');
    if (key === name) return decodeURIComponent(parts.join('='));
  }
  return '';
}

function sessionFor(req) {
  const token = cookieValue(req, 'portfolio_admin');
  const expiresAt = sessions.get(token);
  if (!expiresAt || expiresAt < Date.now()) {
    sessions.delete(token);
    return '';
  }
  return token;
}

function setSessionCookie(req, res, token, clear = false) {
  const secure = req.headers['x-forwarded-proto'] === 'https' ? '; Secure' : '';
  const value = clear ? 'portfolio_admin=; Max-Age=0; Path=/; HttpOnly; SameSite=Strict' : `portfolio_admin=${encodeURIComponent(token)}; Max-Age=43200; Path=/; HttpOnly; SameSite=Strict${secure}`;
  res.setHeader('Set-Cookie', value);
}

function readBody(req) {
  return new Promise((resolve, reject) => {
    let body = '';
    req.on('data', chunk => {
      body += chunk;
      if (Buffer.byteLength(body) > MAX_BODY_BYTES) {
        reject(new Error('too-large'));
        req.destroy();
      }
    });
    req.on('end', () => {
      try { resolve(JSON.parse(body || '{}')); } catch { reject(new Error('invalid-json')); }
    });
    req.on('error', reject);
  });
}

function parseVideoLink(input) {
  let url;
  try { url = new URL(String(input || '').trim()); } catch { return null; }
  const host = url.hostname.toLowerCase().replace(/^www\./, '');
  if (host === 'streamable.com') {
    const id = url.pathname.split('/').filter(Boolean).at(-1);
    if (!id || !/^[a-zA-Z0-9]+$/.test(id)) return null;
    return { id: `streamable-${id}`, type: 'streamable', url: `https://streamable.com/e/${id}` };
  }
  if (host === 'vimeo.com' || host === 'player.vimeo.com') {
    const parts = url.pathname.split('/').filter(Boolean);
    const id = host === 'player.vimeo.com' ? (parts[0] === 'video' ? parts[1] : '') : parts.find(part => /^\d+$/.test(part));
    if (!id || !/^\d+$/.test(id)) return null;
    const hash = url.searchParams.get('h') || (parts[parts.indexOf(id) + 1] || '');
    const player = new URL(`https://player.vimeo.com/video/${id}`);
    if (/^[a-zA-Z0-9]+$/.test(hash)) player.searchParams.set('h', hash);
    player.searchParams.set('title', '0');
    player.searchParams.set('byline', '0');
    player.searchParams.set('portrait', '0');
    return { id: `vimeo-${id}`, type: 'vimeo', url: player.toString() };
  }
  return null;
}

function nextTitle(group, videos) {
  const existingStaticCount = { ads: 2, short: 6, long: 5 }[group] || 0;
  const count = videos.filter(video => video.group === group).length + existingStaticCount + 1;
  const number = String(count).padStart(2, '0');
  if (group === 'ads') return { title: `إعلان ${number}`, titleEn: `Advertisement ${number}` };
  if (group === 'short') return { title: `فيديو قصير ${number}`, titleEn: `Short Video ${number}` };
  return { title: `فيديو طويل ${number}`, titleEn: `Long Video ${number}` };
}

function sendPortfolioScript(res) {
  const data = JSON.stringify(readVideos()).replace(/</g, '\\u003c').replace(/\u2028/g, '\\u2028').replace(/\u2029/g, '\\u2029');
  res.writeHead(200, { 'Content-Type': 'text/javascript; charset=utf-8', 'Cache-Control': 'no-store', 'X-Content-Type-Options': 'nosniff' });
  res.end(`window.portfolioVideos.push(...${data});`);
}

function contentType(file) {
  return ({ '.html': 'text/html; charset=utf-8', '.js': 'text/javascript; charset=utf-8', '.css': 'text/css; charset=utf-8', '.json': 'application/json; charset=utf-8', '.jpg': 'image/jpeg', '.jpeg': 'image/jpeg', '.png': 'image/png', '.webp': 'image/webp', '.svg': 'image/svg+xml', '.mp4': 'video/mp4' })[path.extname(file).toLowerCase()] || 'application/octet-stream';
}

const server = http.createServer(async (req, res) => {
  const pathname = new URL(req.url, 'http://localhost').pathname;
  if (pathname === '/api/portfolio-videos.js' && req.method === 'GET') return sendPortfolioScript(res);

  if (pathname.startsWith('/api/')) {
    if (['POST', 'DELETE'].includes(req.method) && !originIsSame(req)) return json(res, 403, { error: 'origin' });
    if (pathname === '/api/admin/session' && req.method === 'GET') return json(res, 200, { authenticated: Boolean(sessionFor(req)) });
    if (pathname === '/api/admin/login' && req.method === 'POST') {
      const ip = req.socket.remoteAddress || 'unknown';
      const attempt = loginAttempts.get(ip) || { count: 0, until: 0 };
      if (attempt.until > Date.now() && attempt.count >= 5) return json(res, 429, { error: 'rate-limit' });
      if (attempt.until < Date.now()) { attempt.count = 0; attempt.until = Date.now() + 15 * 60 * 1000; }
      let body;
      try { body = await readBody(req); } catch (error) { return json(res, error.message === 'too-large' ? 413 : 400, { error: 'request' }); }
      const submitted = Buffer.from(String(body.password || ''));
      const expected = Buffer.from(PASSWORD);
      const valid = submitted.length === expected.length && crypto.timingSafeEqual(submitted, expected);
      if (!valid) {
        attempt.count += 1;
        loginAttempts.set(ip, attempt);
        return json(res, 401, { error: 'unauthorized' });
      }
      loginAttempts.delete(ip);
      const token = crypto.randomBytes(32).toString('base64url');
      sessions.set(token, Date.now() + SESSION_TTL);
      setSessionCookie(req, res, token);
      return json(res, 200, { authenticated: true });
    }
    if (pathname === '/api/admin/logout' && req.method === 'POST') {
      sessions.delete(cookieValue(req, 'portfolio_admin'));
      setSessionCookie(req, res, '', true);
      return json(res, 200, { authenticated: false });
    }
    if (pathname === '/api/videos' && req.method === 'POST') {
      if (!sessionFor(req)) return json(res, 401, { error: 'unauthorized' });
      let body;
      try { body = await readBody(req); } catch (error) { return json(res, error.message === 'too-large' ? 413 : 400, { error: 'request' }); }
      const group = ['ads', 'short', 'long'].includes(body.group) ? body.group : '';
      const video = parseVideoLink(body.url);
      if (!group || !video) return json(res, 400, { error: 'invalid-video' });
      const videos = readVideos();
      if (videos.some(item => item.id === video.id)) return json(res, 409, { error: 'duplicate' });
      const record = { ...video, group, ...nextTitle(group, videos), addedAt: new Date().toISOString() };
      videos.push(record);
      const temporary = `${DATA_FILE}.${crypto.randomBytes(8).toString('hex')}.tmp`;
      fs.writeFileSync(temporary, `${JSON.stringify(videos, null, 2)}\n`, { flag: 'wx' });
      fs.renameSync(temporary, DATA_FILE);
      return json(res, 201, { video: record });
    }
    return json(res, 404, { error: 'not-found' });
  }

  const relative = pathname === '/' ? 'index.html' : decodeURIComponent(pathname).replace(/^\/+/, '');
  const target = path.resolve(ROOT, relative);
  if (target !== ROOT && !target.startsWith(`${ROOT}${path.sep}`)) return json(res, 403, { error: 'forbidden' });
  if (target === DATA_DIR || target.startsWith(`${DATA_DIR}${path.sep}`)) return json(res, 404, { error: 'not-found' });
  fs.stat(target, (error, stats) => {
    if (error || !stats.isFile()) {
      res.writeHead(404, { 'Content-Type': 'text/plain; charset=utf-8' });
      return res.end('Not found');
    }
    const headers = { 'Content-Type': contentType(target), 'X-Content-Type-Options': 'nosniff', 'Accept-Ranges': 'bytes' };
    const range = req.headers.range;
    const match = range && /^bytes=(\d*)-(\d*)$/.exec(range);
    if (match && stats.size) {
      const start = match[1] ? Number(match[1]) : Math.max(0, stats.size - Number(match[2]));
      const end = match[2] && match[1] ? Math.min(Number(match[2]), stats.size - 1) : stats.size - 1;
      if (start <= end && start < stats.size) {
        headers['Content-Range'] = `bytes ${start}-${end}/${stats.size}`;
        headers['Content-Length'] = end - start + 1;
        res.writeHead(206, headers);
        return fs.createReadStream(target, { start, end }).pipe(res);
      }
    }
    headers['Content-Length'] = stats.size;
    res.writeHead(200, headers);
    if (req.method === 'HEAD') return res.end();
    fs.createReadStream(target).pipe(res);
  });
});

server.listen(PORT, '0.0.0.0', () => console.log(`Portfolio listening on ${PORT}`));
