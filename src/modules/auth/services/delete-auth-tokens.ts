import { deleteCookie } from '@shared/server-actions/cookies';
import { DeleteAuthTokensPort } from '@modules/auth/domain/ports';
import { HEALTHNEXUS_TOKEN_KEY, SSO_TOKEN_KEY } from './token-keys';

const deleteAuthTokensService = async () => {
  await deleteCookie(HEALTHNEXUS_TOKEN_KEY);
  await deleteCookie(SSO_TOKEN_KEY);
};

const deleteAuthTokens: DeleteAuthTokensPort = async () => {
  await deleteAuthTokensService();
};

export default deleteAuthTokens;
