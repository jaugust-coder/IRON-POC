import { setHttpOnlyCookie } from '@shared/server-actions/cookies';
import { SetAuthSsoTokensPort } from '@modules/auth/domain/ports';
import { SSO_TOKEN_KEY } from './token-keys';

const setAuthSsoTokens: SetAuthSsoTokensPort = async ({ ssoToken }) => {
  await setHttpOnlyCookie(SSO_TOKEN_KEY, ssoToken);
};

export default setAuthSsoTokens;
