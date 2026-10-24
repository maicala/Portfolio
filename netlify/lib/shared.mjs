import { createHmac, randomBytes, timingSafeEqual } from 'node:crypto';
import { getStore } from '@netlify/blobs';

export const SESSION_COOKIE = 'portfolio_admin';
export const SESSION_TTL_SECONDS = 12 * 60 * 60;
const DATA_STORE = 'portfolio-data';
const VIDEOS_KEY = 'videos-v1';

export function jsonResponse(status, body, headers = {}) {
  return new Response(JSON.stringify(body), {
    status,
    headers: { 'Content-Type': 'application/json; charset=utf-8', 'Cache-Control': 'no-store', ...headers },
  });
}

export function isSameOrigin(request) {
  const origin = request.headers.get('origin');
  if (!origin) return false;
  try {
    return new URL(origin).host === new URL(request.url).host;
  } catch {
    return false;
  }
}

export function getCookie(request, name) {
  const cookieHeader = request.headers.get('cookie') || '';
  for (const entry of cookieHeader.split(';')) {
    const separator = entry.indexOf('=');
    if (separator < 0) continue;
    if (entry.slice(0, separator).trim() === name) {
      try { return decodeURIComponent(entry.slice(separator + 1).trim()); } catch { return ''; }
    }
  }
  return '';
}

function sessionSignature(payload, secret) {
  return createHmac('sha256', secret).update(payload).digest('base64url');
}

export function createSessionToken(secret) {
  const payload = `${Math.floor(Date.now() / 1000) + SESSION_TTL_SECONDS}.${randomBytes(24).toString('base64url')}`;
  return `${payload}.${sessionSignature(payload, secret)}`;
}

export function hasValidSession(request, secret) {
  if (!secret) return false;
  const token = getCookie(request, SESSION_COOKIE);
  const parts = token.split('.');
  if (parts.length !== 3 || !/^\d+$/.test(parts[0])) return false;
  if (Number(parts[0]) <= Math.floor(Date.now() / 1000)) return false;
  const payload = `${parts[0]}.${parts[1]}`;
  const expected = Buffer.from(sessionSignature(payload, secret));
  const supplied = Buffer.from(parts[2]);
  return supplied.length === expected.length && timingSafeEqual(supplied, expected);
}

export function sessionCookie(token, clear = false) {
  const secure = process.env.CONTEXT === 'dev' ? '' : '; Secure';
  if (clear) return `${SESSION_COOKIE}=; Max-Age=0; Path=/; HttpOnly; SameSite=Strict${secure}`;
  return `${SESSION_COOKIE}=${encodeURIComponent(token)}; Max-Age=${SESSION_TTL_SECONDS}; Path=/; HttpOnly; SameSite=Strict${secure}`;
}

export async function readVideos() {
  const store = getStore({ name: DATA_STORE, consistency: 'strong' });
  return (await store.get(VIDEOS_KEY, { type: 'json' })) || [];
}

export async function saveVideos(videos) {
  const store = getStore({ name: DATA_STORE, consistency: 'strong' });
  await store.setJSON(VIDEOS_KEY, videos);
}

export async function readJsonBody(request, maxBytes = 12_000) {
  const raw = await request.text();
  if (Buffer.byteLength(raw) > maxBytes) throw new Error('too-large');
  try {
    return JSON.parse(raw || '{}');
  } catch {
    throw new Error('invalid-json');
  }
}

export function parseVideoLink(input) {
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

export function nextTitle(group, videos) {
  const existingStaticCount = { ads: 2, short: 6, long: 5 }[group] || 0;
  const count = videos.filter(video => video.group === group).length + existingStaticCount + 1;
  const number = String(count).padStart(2, '0');
  if (group === 'ads') return { title: `إعلان ${number}`, titleEn: `Advertisement ${number}` };
  if (group === 'short') return { title: `فيديو قصير ${number}`, titleEn: `Short Video ${number}` };
  return { title: `فيديو طويل ${number}`, titleEn: `Long Video ${number}` };
}

