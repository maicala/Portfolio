import { timingSafeEqual } from 'node:crypto';
import { createSessionToken, isSameOrigin, jsonResponse, readJsonBody, sessionCookie, SESSION_TTL_SECONDS } from '../lib/shared.mjs';

export default async function handler(request) {
  if (request.method !== 'POST') return jsonResponse(405, { error: 'method-not-allowed' });
  if (!isSameOrigin(request)) return jsonResponse(403, { error: 'origin' });

  const password = process.env.ADMIN_PASSWORD || '';
  if (password.length < 12) return jsonResponse(503, { error: 'not-configured' });

  let body;
  try { body = await readJsonBody(request); }
  catch (error) { return jsonResponse(error.message === 'too-large' ? 413 : 400, { error: 'request' }); }

  const submitted = Buffer.from(String(body.password || ''));
  const expected = Buffer.from(password);
  const valid = submitted.length === expected.length && timingSafeEqual(submitted, expected);
  if (!valid) return jsonResponse(401, { error: 'unauthorized' });

  return jsonResponse(200, { authenticated: true }, {
    'Set-Cookie': sessionCookie(createSessionToken(password)),
    'Cache-Control': `private, no-store, max-age=${SESSION_TTL_SECONDS}`,
  });
}

export const config = {
  path: '/api/admin/login',
  method: 'POST',
  rateLimit: { windowLimit: 5, windowSize: 900, aggregateBy: 'ip', action: 'rate_limit' },
};

