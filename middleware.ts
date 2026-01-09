import createMiddleware from 'next-intl/middleware';
import { NextRequest, NextResponse } from 'next/server';
import i18nConfig from './next-intl.config';

const i18nMiddleware = createMiddleware(i18nConfig);

// Set to true to enable password protection
const ENABLE_PASSWORD_PROTECTION = true;
const SITE_PASSWORD = process.env.SITE_PASSWORD; // Set in .env.local and Vercel

export default function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  
  // Skip password protection for studio, api, and static files
  if (
    pathname.startsWith('/studio') ||
    pathname.startsWith('/api') ||
    pathname.startsWith('/_next') ||
    pathname.includes('.')
  ) {
    return NextResponse.next();
  }

  // Password protection logic
  if (ENABLE_PASSWORD_PROTECTION) {
    const authCookie = request.cookies.get('site-auth');
    
    // If already authenticated, continue
    if (authCookie?.value === 'authenticated') {
      return i18nMiddleware(request);
    }
    
    // Check if this is a password submission
    if (pathname === '/unlock') {
      return NextResponse.next();
    }
    
    // Redirect to unlock page
    const url = request.nextUrl.clone();
    url.pathname = '/unlock';
    return NextResponse.redirect(url);
  }

  return i18nMiddleware(request);
}

export const config = {
  matcher: [
    // Match all pathnames except:
    // - API routes
    // - Static files (with extensions like .png, .jpg, .ico, .svg, etc.)
    // - _next internal paths
    // - studio (Sanity)
    '/((?!api|_next|studio|.*\\..*).*)'
  ]
};
