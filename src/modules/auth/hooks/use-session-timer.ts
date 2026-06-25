'use client';

import { IIdleTimer, useIdleTimer } from 'react-idle-timer';
import { useRouter } from 'next/navigation';
import useUserAuth from './use-user-auth';
import checkAndRefreshAuthTokens, {
  NEED_REFRESH_SSO_TOKEN
} from '@modules/auth/utils/check-and-refresh-auth-tokens';

const TIME_INTERVAL = 60000;
const DEBOUNCE = 500;

const useSessionTimer = () => {
  const router = useRouter();
  const { userAuthMutate } = useUserAuth();

  const onRefreshToken = async (idleTimer: IIdleTimer) => {
    const { getElapsedTime, reset } = idleTimer;
    const currentSessionTime = getElapsedTime();

    if (currentSessionTime <= TIME_INTERVAL) return;
    reset();

    const [data, error] = await checkAndRefreshAuthTokens();

    if (data?.newTokens) {
      userAuthMutate();
      return;
    }

    if (data) return;

    if (error.error === NEED_REFRESH_SSO_TOKEN) {
      router.push(error.redirectUrl);
      return;
    }

    userAuthMutate();
  };

  const inIdleAction: (event?: Event, idleTimer?: IIdleTimer) => void = (
    event,
    idleTimer
  ) => {
    if (!idleTimer) return;

    onRefreshToken(idleTimer);
  };

  useIdleTimer({
    debounce: DEBOUNCE,
    onActive: inIdleAction,
    onAction: inIdleAction
  });
};

export default useSessionTimer;
