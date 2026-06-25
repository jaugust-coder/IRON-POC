'use client';

import { useEffect } from 'react';
import { useCallbackRef } from '@radix-ui/react-use-callback-ref';
import SpinnerPage from '@shared/components/spinner-page';
import deleteAuthTokens from '@modules/auth/services/delete-auth-tokens';
import { useRouter } from 'next/navigation';

type ErrorLoginProps = {
  redirectUrl: string;
};

const ErrorLogin = ({ redirectUrl }: ErrorLoginProps) => {
  const router = useRouter();
  const authTokensEvent = useCallbackRef(async () => {
    await deleteAuthTokens();
    router.push(redirectUrl);
  });

  useEffect(() => {
    authTokensEvent();
  }, [authTokensEvent]);

  return <SpinnerPage />;
};
export default ErrorLogin;
