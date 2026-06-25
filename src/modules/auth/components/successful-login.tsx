'use client';

import { useEffect, useState } from 'react';
import { useCallbackRef } from '@radix-ui/react-use-callback-ref';
import SpinnerPage from '@shared/components/spinner-page';
import { useRouter } from 'next/navigation';
import { trackEvent } from '@purplelab/organisms-ui/analytics-monitoring';
import setAuthSsoTokens from '../services/set-auth-sso-token';
import useUserAuth from '../hooks/use-user-auth';

type SuccessfulLoginProps = {
  ssoToken: string;
  healthnexusToken: string;
  returnUrl: string;
  userId: string;
  userEmail: string;
};

type LoginCheckerProps = Omit<SuccessfulLoginProps, 'ssoToken'>;

const LoginCheckUser = (props: Readonly<LoginCheckerProps>) => {
  const { returnUrl, userId, userEmail } = props;

  const router = useRouter();

  const { userAuthData, clientData } = useUserAuth();

  useEffect(() => {
    if (!userAuthData || !clientData) return;

    trackEvent({
      event: 'Advertising - Login'
    });

    router.push(returnUrl);
  }, [userAuthData, clientData, returnUrl, router, userId, userEmail]);

  return <SpinnerPage />;
};

const SuccessfulLogin = (props: Readonly<SuccessfulLoginProps>) => {
  const { ssoToken } = props;

  const [isLoading, setIsLoading] = useState(true);

  const authTokensEvent = useCallbackRef(async () => {
    await setAuthSsoTokens({ ssoToken });
    setIsLoading(false);
  });

  useEffect(() => {
    authTokensEvent();
  }, [authTokensEvent]);

  if (isLoading) {
    return <SpinnerPage />;
  }

  return <LoginCheckUser {...props} />;
};

export default SuccessfulLogin;
