import {
  LoginPageSearchPararmas,
  loginPageSearchParamsSchema,
  getCheckloginSSOUrl
} from '@purplelab/services-ui/ssoPage';
import { APP_URL } from '@shared/domain/app-url';
import verifyUserLogin from '@purplelab/services-ui/verify-user-login';
import SuccessfulLogin from '@modules/auth/components/successful-login';
import checkAppUsersPermissions from '@modules/auth/domain/check-app-users-permissions';
import ErrorLogin from '@modules/auth/components/error-login';

type LoginPageProps = {
  searchParams: Promise<LoginPageSearchPararmas>;
};

export default async function LoginPage(props: Readonly<LoginPageProps>) {
  const searchParams = await props.searchParams;
  const { success } = loginPageSearchParamsSchema.safeParse(searchParams);

  if (!success) {
    const checklogingUrl = getCheckloginSSOUrl(APP_URL);
    return <ErrorLogin redirectUrl={checklogingUrl} />;
  }

  const { token: ssoToken, return_url: returnUrl } = searchParams;

  const [userData, error] = await verifyUserLogin({
    ssoToken,
    checkAppUsersPermissions,
    appUrl: APP_URL
  });

  if (error) {
    return <ErrorLogin redirectUrl={error.redirectUrl} />;
  }

  const { token: healthnexusToken } = userData;

  return (
    <SuccessfulLogin
      ssoToken={ssoToken}
      healthnexusToken={healthnexusToken}
      returnUrl={returnUrl}
      userId={userData.userId}
      userEmail={userData.email}
    />
  );
}
