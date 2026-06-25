import checkAndRefreshAuthTokens, {
  NEED_REFRESH_HN_TOKEN,
  NEED_REFRESH_SSO_TOKEN
} from '@modules/auth/utils/check-and-refresh-auth-tokens';
import { ErrorService } from '@purplelab/services-ui/error-service';
import { BeforeRequestHook } from 'ky';
import { getHNToken } from './getHNToken';
import { HEALTHNEXUS_API_KEY } from '@shared/domain/env-variables';
import AuthContextManager from '@modules/auth/domain/auth-context-manager';

export const beforeRequest: BeforeRequestHook = async (request) => {
  const [data, error] = await checkAndRefreshAuthTokens();

  if (error?.error === NEED_REFRESH_SSO_TOKEN) {
    throw new ErrorService('error NEED_REFRESH_SSO_TOKEN', 500);
  } else if (error?.error === NEED_REFRESH_HN_TOKEN) {
    const { ssoToken } = error.tokens;
    await getHNToken(ssoToken);
  } else if (data?.newTokens) {
    const { ssoToken } = data.newTokens;
    await getHNToken(ssoToken);
  }

  const { healthnexusToken } = AuthContextManager.getInstance();

  request.headers.set('x-api-key', HEALTHNEXUS_API_KEY);
  request.headers.set('Authorization', healthnexusToken);
  request.headers.set('Content-Type', 'application/json');
};
