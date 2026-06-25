import { APP_URL } from '@shared/domain/app-url';
import {
  HEALTHNEXUS_TOKEN_KEY,
  SSO_TOKEN_KEY
} from '@modules/auth/services/token-keys';
import { getCheckloginSSOUrl } from '@purplelab/services-ui/ssoPage';
import { checkAuthTokens } from '@purplelab/services-ui/token';
import { NextResponse, NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  if (request.method === 'POST' && request.headers.has('Next-Action')) return;

  const currentUrl = `${APP_URL}${request.nextUrl.pathname}${request.nextUrl?.search ?? ''}`;

  const healthnexusToken =
    request.cookies.get(HEALTHNEXUS_TOKEN_KEY)?.value ?? '';
  const ssoToken = request.cookies.get(SSO_TOKEN_KEY)?.value ?? '';

  const hasValidAuthTokens = checkAuthTokens({
    healthnexusToken,
    ssoToken
  });

  if (!hasValidAuthTokens) {
    const response = NextResponse.redirect(
      new URL(getCheckloginSSOUrl(currentUrl))
    );
    response.cookies.delete(HEALTHNEXUS_TOKEN_KEY);
    response.cookies.delete(SSO_TOKEN_KEY);

    return response;
  }
}

export const config = {
  matcher: [
    '/((?!api|_next|fonts|login|unauthorized|monitoring|[\\w-]+\\.\\w+).*)' // NOSONAR - Complex regex pattern required for Next.js middleware matcher
  ]
};
