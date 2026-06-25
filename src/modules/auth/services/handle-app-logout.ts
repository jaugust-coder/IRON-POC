import deleteAuthTokens from '@modules/auth/services/delete-auth-tokens';
import getAuthSsoTokensService from '@modules/auth/services/get-auth-tokens';
import { resetMixpanel } from '@purplelab/organisms-ui/analytics-monitoring';
import { getPortalUrl } from '@purplelab/services-ui/agreements';
import safeRequest from '@purplelab/services-ui/safe-request';
import { getLogoutSSOUrl } from '@purplelab/services-ui/ssoPage';

export const handleAppLogout = async () => {
  const [response] = await safeRequest(getAuthSsoTokensService)();
  const ssoToken = response ?? '';
  const portalUrl = getPortalUrl();
  const logoutUrl = getLogoutSSOUrl(ssoToken, portalUrl);
  await deleteAuthTokens();
  resetMixpanel();
  return logoutUrl;
};
