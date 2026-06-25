import type { Metadata } from 'next';
import './globals.css';
import '@purplelab/atoms-ui/default-theme-variables.css';
import { Toaster } from '@purplelab/atoms-ui/toast/toaster';
import '@shared/domain/env-variables';
import APP_SOURCE from '@shared/domain/app-source';

export const metadata: Metadata = {
  title: APP_SOURCE,
  description: 'Audience Builder by Health Nexus',
  icons: {
    icon: 'https://healthnexus-ui.s3.amazonaws.com/images/healthnexus-icono.svg'
  }
};

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="h-full" translate="no">
      <body className="h-full">
        <main className="flex h-full min-w-[1200px] flex-col overflow-x-auto">
          {children}
        </main>
        <Toaster />
      </body>
    </html>
  );
}
