import { getCookie } from '@shared/server-actions/cookies';
import { GetAuthSsoTokensPort } from '@modules/auth/domain/ports';
import { SSO_TOKEN_KEY } from './token-keys';
import { z } from 'zod';

const getAuthSsoTokensServiceSchema = z.string().min(1, 'ssoToken is required');

type GetAuthSsoTokensServiceResponse = z.infer<
  typeof getAuthSsoTokensServiceSchema
>;

const getAuthSsoTokensService =
  async (): Promise<GetAuthSsoTokensServiceResponse> => {
    const ssoToken = await getCookie(SSO_TOKEN_KEY);

    const response = getAuthSsoTokensServiceSchema.parse(ssoToken);
    return response;
  };

const getAuthSsoTokens: GetAuthSsoTokensPort = async () => {
  const response = await getAuthSsoTokensService();
  return response;
};

export default getAuthSsoTokens;
