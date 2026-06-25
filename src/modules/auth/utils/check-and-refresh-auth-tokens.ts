import { needRefreshToken, AuthTokens } from '@purplelab/services-ui/token';
import checkAndRefreshSsoToken from '@purplelab/services-ui/check-and-refresh-sso-token';
import AuthContextManager from '@modules/auth/domain/auth-context-manager';
import setAuthTokens from '@modules/auth/services/set-auth-tokens';

export const NEED_REFRESH_HN_TOKEN = 'NEED_REFRESH_HN_TOKEN';
export const NEED_REFRESH_SSO_TOKEN = 'NEED_REFRESH_SSO_TOKEN';

type SuccessfulResponse = [
  { currentTokens: AuthTokens; newTokens?: AuthTokens },
  undefined
];
type FailedResponse = [
  undefined,
  (
    | {
        error: typeof NEED_REFRESH_SSO_TOKEN;
        redirectUrl: string;
      }
    | {
        error: typeof NEED_REFRESH_HN_TOKEN;
        tokens: AuthTokens;
      }
  )
];

type CheckAndRefreshAuthTokensResponse = SuccessfulResponse | FailedResponse;

const checkAndRefreshAuthTokens =
  async (): Promise<CheckAndRefreshAuthTokensResponse> => {
    const { ssoToken, healthnexusToken } = AuthContextManager.getInstance();
    const appUrl = globalThis.location.href;
    const [response, error] = await checkAndRefreshSsoToken({
      ssoToken,
      appUrl
    });

    if (error) {
      return [
        undefined,
        { error: NEED_REFRESH_SSO_TOKEN, redirectUrl: error.redirectUrl }
      ];
    }
    if (response !== ssoToken) {
      await setAuthTokens({ ssoToken: response, healthnexusToken });
      return [
        {
          currentTokens: { ssoToken, healthnexusToken },
          newTokens: { ssoToken: response, healthnexusToken }
        },
        undefined
      ];
    }

    const needRefreshHealthnexusToken = needRefreshToken(healthnexusToken);
    if (!needRefreshHealthnexusToken)
      return [
        {
          currentTokens: { ssoToken, healthnexusToken }
        },
        undefined
      ];
    return [
      undefined,
      {
        error: NEED_REFRESH_HN_TOKEN,
        tokens: { ssoToken, healthnexusToken }
      }
    ];
  };

export default checkAndRefreshAuthTokens;
