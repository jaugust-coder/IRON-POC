'use client';

import { ReactNode } from 'react';
import useUserAuth from '@modules/auth/hooks/use-user-auth';
import SpinnerPage from '@shared/components/spinner-page';
import useSessionTimer from '@modules/auth/hooks/use-session-timer';

type SuccessfulAuthProps = {
  children: ReactNode;
};

const SuccessfulAuth = ({ children }: SuccessfulAuthProps) => {
  const { userAuthData, userAuthIsLoading, clientData, clientIsLoading } =
    useUserAuth();

  useSessionTimer();

  if (userAuthIsLoading || !userAuthData || !clientData || clientIsLoading)
    return <SpinnerPage />;

  return children;
};
export default SuccessfulAuth;
