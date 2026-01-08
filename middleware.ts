import createMiddleware from 'next-intl/middleware';
import i18nConfig from './next-intl.config';

export default createMiddleware(i18nConfig);
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
