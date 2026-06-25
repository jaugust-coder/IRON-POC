'use client';

import { useMixpanelInit } from '@purplelab/organisms-ui/analytics-monitoring';
import { KEY_MONITORING } from '@shared/domain/monitoring-key';

export default function AuthenticatedLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  useMixpanelInit({
    mixpanelToken: KEY_MONITORING,
    debugAnalytics: false,
    availableAnalytics: true
  });
  return <>{children}</>;
}
