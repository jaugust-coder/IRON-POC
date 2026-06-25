import { setHttpOnlyCookie } from '@shared/server-actions/cookies';
import { SetAuthTokensPort } from '@modules/auth/domain/ports';
import { HEALTHNEXUS_TOKEN_KEY, SSO_TOKEN_KEY } from './token-keys';

type SetAuthTokensServiceData = {
  ssoToken: string;
  healthnexusToken: string;
};

const setAuthTokensService = async ({
  ssoToken,
  healthnexusToken
}: SetAuthTokensServiceData) => {
  await setHttpOnlyCookie(HEALTHNEXUS_TOKEN_KEY, healthnexusToken);
  await setHttpOnlyCookie(SSO_TOKEN_KEY, ssoToken);
};

const setAuthTokens: SetAuthTokensPort = async (data) => {
  await setAuthTokensService(data);
};

export default setAuthTokens;
