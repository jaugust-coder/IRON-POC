'use client';

import Monitoring from '@purplelab/organisms-ui/monitoring';
import APP_SOURCE from '@shared/domain/app-source';
import useUserAuth from '@modules/auth/hooks/use-user-auth';

export default function MonitoringProvider({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  const { userAuthData, clientData } = useUserAuth();
  const { id: clientId, name: clientName } = clientData ?? {};
  const { email: username } = userAuthData ?? {};

  return (
    <Monitoring
      appSource={APP_SOURCE}
      clientId={clientId}
      clientName={clientName}
      userName={username}
    >
      {children}
    </Monitoring>
  );
}
