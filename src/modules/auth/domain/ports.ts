import { AuthTokens } from '@purplelab/services-ui/token';

export type GetAuthSsoTokensPort = () => Promise<AuthTokens['ssoToken']>;

export type GetAuthTokensPort = () => Promise<AuthTokens>;

export type SetAuthTokensPort = (data: AuthTokens) => Promise<void>;

export type DeleteAuthTokensPort = () => Promise<void>;

export type SetAuthSsoTokensPort = (
  data: Pick<AuthTokens, 'ssoToken'>
) => Promise<void>;
