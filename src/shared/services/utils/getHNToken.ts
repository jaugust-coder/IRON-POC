import AuthContextManager from '@modules/auth/domain/auth-context-manager';
import checkAppUsersPermissions from '@modules/auth/domain/check-app-users-permissions';
import setAuthTokens from '@modules/auth/services/set-auth-tokens';
import { ErrorService } from '@purplelab/services-ui/error-service';
import verifyUserLogin from '@purplelab/services-ui/verify-user-login';
import { APP_URL } from '@shared/domain/app-url';

export const getHNToken = async (ssoToken: string) => {
  const [userData, error] = await verifyUserLogin({
    ssoToken,
    checkAppUsersPermissions,
    appUrl: APP_URL
  });

  if (error) {
    throw new ErrorService('error verifyUserLogin', 500);
  }

  const { token: healthnexusToken } = userData;

  AuthContextManager.initialize({ ssoToken, healthnexusToken });
  await setAuthTokens({ ssoToken, healthnexusToken });
};
