import {
  hasValidSession,
  isSameOrigin,
  jsonResponse,
  nextTitle,
  parseVideoLink,
  readJsonBody,
  readVideos,
  saveVideos,
  sessionCookie,
} from '../lib/shared.mjs';

const routes = [
  '/api/admin/session',
  '/api/admin/logout',
  '/api/videos',
  '/api/portfolio-videos.js',
];

export default async function handler(request) {
  const { pathname } = new URL(request.url);
  const password = process.env.ADMIN_PASSWORD || '';

  if (pathname === '/api/portfolio-videos.js' && request.method === 'GET') {
    const data = JSON.stringify(await readVideos())
      .replace(/</g, '\\u003c')
      .replace(/\u2028/g, '\\u2028')
      .replace(/\u2029/g, '\\u2029');
    return new Response(`window.portfolioVideos.push(...${data});`, {
      headers: {
        'Content-Type': 'text/javascript; charset=utf-8',
        'Cache-Control': 'no-store',
        'X-Content-Type-Options': 'nosniff',
      },
    });
  }

  if (pathname === '/api/admin/session' && request.method === 'GET') {
    return jsonResponse(200, { authenticated: hasValidSession(request, password) });
  }

  if (pathname === '/api/admin/logout' && request.method === 'POST') {
    if (!isSameOrigin(request)) return jsonResponse(403, { error: 'origin' });
    return jsonResponse(200, { authenticated: false }, { 'Set-Cookie': sessionCookie('', true) });
  }

  if (pathname === '/api/videos' && request.method === 'POST') {
    if (!isSameOrigin(request)) return jsonResponse(403, { error: 'origin' });
    if (!hasValidSession(request, password)) return jsonResponse(401, { error: 'unauthorized' });
    let body;
    try { body = await readJsonBody(request); }
    catch (error) { return jsonResponse(error.message === 'too-large' ? 413 : 400, { error: 'request' }); }
    const group = ['ads', 'short', 'long'].includes(body.group) ? body.group : '';
    const video = parseVideoLink(body.url);
    if (!group || !video) return jsonResponse(400, { error: 'invalid-video' });
    const videos = await readVideos();
    if (videos.some(item => item.id === video.id)) return jsonResponse(409, { error: 'duplicate' });
    const record = { ...video, group, ...nextTitle(group, videos), addedAt: new Date().toISOString() };
    videos.push(record);
    await saveVideos(videos);
    return jsonResponse(201, { video: record });
  }

  return jsonResponse(405, { error: 'method-not-allowed' });
}

export const config = { path: routes };

