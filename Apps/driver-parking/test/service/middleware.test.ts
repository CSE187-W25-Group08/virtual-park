import { it, expect, vi, beforeEach } from 'vitest';
import { NextRequest } from 'next/server';
import middleware from '../../src/middleware';

global.fetch = vi.fn();

vi.mock('server-only', () => ({}));
vi.mock('next/server', () => ({
  NextResponse: {
    next: vi.fn(() => 'nextRes'),
    redirect: vi.fn(() => 'redirectRes')
  }
}));

beforeEach(() => {
  vi.clearAllMocks();
  TextEncoder = class {
    encode() {
      return new Uint8Array();
    }
  } as typeof TextEncoder;
  
  /* reference: https://www.geeksforgeeks.org/node-url-tostring-method/ */
  URL = function(url:string) {
    return {
      pathname: url,
      toString: function() {
        return '/login';
      }
    };
  } as unknown as typeof URL;
});
/* https://www.omarileon.me/blog/as-unknown-as-typescript */
it('valid token login', async () => {
  global.fetch = vi.fn().mockResolvedValueOnce({
    status: 200,
    json: () => Promise.resolve({ user: 'jack' })
  });

  const req = {
    nextUrl: { pathname: '/' },
    cookies: { get: vi.fn().mockReturnValue({ value: 'validTok' }) },
  } as unknown as NextRequest;

  const result = await middleware(req);
  expect(result).toBe('nextRes');
  
  expect(fetch).toHaveBeenCalledWith('http://localhost:3010/api/v0/auth/check', {
    method: 'GET',
    headers: {
      'Authorization': 'Bearer validTok'
    }
  });
});

it('invalid token will redirect back to the login', async () => {
  global.fetch = vi.fn().mockResolvedValueOnce({
    status: 401,
    json: () => Promise.reject('Unauthorized')
  });
  const req = {
    nextUrl: { pathname: '/' },
    cookies: { get: vi.fn().mockReturnValue({ value: 'invalidTok' }) },
  } as unknown as NextRequest;

  const result = await middleware(req);
  expect(result).toBe('redirectRes');
});