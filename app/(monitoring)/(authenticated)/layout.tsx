import AuthAwareNavbar from '@modules/navbar/components/auth-aware-navbar';
import MonitoringProvider from '@modules/monitoring/components/monitoring-provider';
import SuccessfulAuth from '@modules/auth/components/successful-auth';
import { LoadingProvider } from '@shared/context/loading-page';

export default function AuthenticatedLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <MonitoringProvider>
      <SuccessfulAuth>
        <LoadingProvider>
          <div className="sticky top-0 z-10 w-full">
            <AuthAwareNavbar />
          </div>

          {children}
        </LoadingProvider>
      </SuccessfulAuth>
    </MonitoringProvider>
  );
}
