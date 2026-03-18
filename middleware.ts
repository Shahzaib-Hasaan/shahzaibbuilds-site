import { NextRequest, NextResponse } from 'next/server';

// In-memory rate limit store (per-serverless-instance; acceptable for a personal site)
// Key: IP address, Value: { count: number, resetAt: number }
const rateLimitMap = new Map<string, { count: number; resetAt: number }>();

const RATE_LIMIT_MAX = 5;
const RATE_LIMIT_WINDOW = 60_000; // 1 minute in ms

function getRateLimit(ip: string): { allowed: boolean; remaining: number } {
  const now = Date.now();
  const entry = rateLimitMap.get(ip);

  if (!entry || now > entry.resetAt) {
    rateLimitMap.set(ip, { count: 1, resetAt: now + RATE_LIMIT_WINDOW });
    return { allowed: true, remaining: RATE_LIMIT_MAX - 1 };
  }

  if (entry.count >= RATE_LIMIT_MAX) {
    return { allowed: false, remaining: 0 };
  }

  entry.count += 1;
  return { allowed: true, remaining: RATE_LIMIT_MAX - entry.count };
}

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Coming Soon mode — redirect all non-root pages to home
  if (pathname.startsWith('/blog')) {
    return NextResponse.redirect(new URL('/', request.url));
  }

  // Only rate limit the download endpoint
  if (pathname !== '/api/download') {
    return NextResponse.next();
  }

  // Get client IP from Netlify's x-forwarded-for header, fallback to request.ip
  const forwarded = request.headers.get('x-forwarded-for');
  const ip = forwarded ? forwarded.split(',')[0].trim() : (request.ip ?? 'unknown');

  const { allowed, remaining } = getRateLimit(ip);

  if (!allowed) {
    return new NextResponse('Too Many Requests', {
      status: 429,
      headers: {
        'Retry-After': '60',
        'X-RateLimit-Limit': String(RATE_LIMIT_MAX),
        'X-RateLimit-Remaining': '0',
      },
    });
  }

  const response = NextResponse.next();
  response.headers.set('X-RateLimit-Limit', String(RATE_LIMIT_MAX));
  response.headers.set('X-RateLimit-Remaining', String(remaining));
  return response;
}

export const config = {
  matcher: ['/api/download', '/blog', '/blog/:path*'],
};
