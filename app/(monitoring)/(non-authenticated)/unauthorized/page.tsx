'use client';
import { Button } from '@purplelab/atoms-ui/button';
import UnauthorizedPageContent from '@purplelab/organisms-ui/unauthorized-page';
import { handleAppLogout } from '@modules/auth/services/handle-app-logout';
import { useRouter } from 'next/navigation';

export default function UnauthorizedPage() {
  const router = useRouter();
  const onLogoutClick = async () => {
    const logoutUrl = await handleAppLogout();
    router.push(logoutUrl);
  };
  return (
    <UnauthorizedPageContent
      title="Audience Builder"
      action={
        <Button size="sm" variant="primary" onClick={onLogoutClick}>
          Go Back to Login
        </Button>
      }
    />
  );
}
