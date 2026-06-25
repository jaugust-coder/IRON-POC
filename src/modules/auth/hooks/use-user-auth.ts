'use client';

import { APP_URL } from '@shared/domain/app-url';
import verifyUserLogin from '@purplelab/services-ui/verify-user-login';
import useSWRImmutable from 'swr/immutable';
import checkAppUsersPermissions from '@modules/auth/domain/check-app-users-permissions';
import { useRouter } from 'next/navigation';
import getMyClient from '@purplelab/services-ui/get-my-client';
import AuthContextManager from '@modules/auth/domain/auth-context-manager';
import setAuthTokens from '@modules/auth/services/set-auth-tokens';
import { UserLoginData } from '@purplelab/services-ui/user';
import getInternalApiPrivateKey from '@purplelab/services-ui/get-internal-api-private-key';
import { safeRequest } from '@purplelab/services-ui/safe-request';
import APP_SOURCE from '@shared/domain/app-source';
import { registerUser } from '@purplelab/organisms-ui/analytics-monitoring';
import getAuthSsoTokens from '@modules/auth/services/get-auth-tokens';

const USER_AUTH = 'checkUserAuth';
const USER_CLIENT = 'getUserClient';

const useUserAuth = () => {
  const router = useRouter();
  const {
    data: userAuthData,
    error: userAuthError,
    isLoading: userAuthIsLoading,
    isValidating: userAuthIsValidating,
    mutate: userAuthMutate
  } = useSWRImmutable(
    USER_AUTH,
    async (): Promise<UserLoginData | undefined> => {
      const [response] = await safeRequest(getAuthSsoTokens)();

      const ssoToken = response ?? '';

      const [userData, error] = await verifyUserLogin({
        ssoToken,
        checkAppUsersPermissions,
        appUrl: APP_URL
      });

      if (error) {
        router.push(error.redirectUrl);
        return;
      }

      const { token: healthnexusToken } = userData;

      AuthContextManager.initialize({ ssoToken, healthnexusToken });
      await setAuthTokens({ ssoToken, healthnexusToken });

      return userData;
    },
    {
      shouldRetryOnError: false
    }
  );

  const {
    data: clientData,
    error: clientError,
    isLoading: clientIsLoading,
    isValidating: clientIsValidating,
    mutate: clientMutate
  } = useSWRImmutable(
    userAuthData?.token ? `${USER_CLIENT}-${userAuthData.token}` : null,
    async () => {
      if (!userAuthData) return;

      const clientData = await getMyClient({
        healthnexusToken: userAuthData.token,
        userId: userAuthData.userId
      });

      if (!clientData) return;

      const { ssoToken } = AuthContextManager.getInstance();
      const responseKey = await getInternalApiPrivateKey({ ssoToken });

      const privateKey = responseKey?.length ? responseKey : 'temp';

      AuthContextManager.setUserData({
        userId: userAuthData.userId,
        clientId: clientData.id,
        privateInternalApiKey: privateKey
      });

      registerUser({
        tenantId: clientData?.id.toString() ?? '',
        tenantName: clientData?.name ?? '',
        userEmail: userAuthData.email ?? '',
        appSource: APP_SOURCE ?? ''
      });

      return clientData;
    },
    {
      shouldRetryOnError: false,
      revalidateIfStale: false,
      revalidateOnFocus: false,
      revalidateOnReconnect: false
    }
  );

  return {
    userAuthData,
    userAuthError,
    userAuthIsLoading,
    userAuthIsValidating,
    userAuthMutate,
    clientData,
    clientError,
    clientIsLoading,
    clientIsValidating,
    clientMutate
  };
};

export default useUserAuth;
