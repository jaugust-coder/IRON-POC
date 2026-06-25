'use client';

import { Button } from '@purplelab/atoms-ui/button';
import * as Sentry from '@sentry/nextjs';
import { useEffect } from 'react';

export default function GlobalError({
  error,
  reset
}: Readonly<{
  error: Error & { digest?: string };
  reset: () => void;
}>) {
  useEffect(() => {
    Sentry.captureException(error);
  }, [error]);

  return (
    <html lang="en" className="h-full">
      <body className="flex h-full flex-col items-center gap-250 text-center">
        <h2 className="text-system-neutral-1000">Something went wrong!</h2>
        <Button variant="primary" size="sm" onClick={() => reset()}>
          Try again
        </Button>
      </body>
    </html>
  );
}
