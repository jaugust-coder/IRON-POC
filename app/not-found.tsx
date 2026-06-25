import SuccessfulAuth from '@modules/auth/components/successful-auth';
import { Button } from '@purplelab/atoms-ui/button';
import NotFoundPageContent from '@purplelab/organisms-ui/not-found-page';
import PAGES_PATHS from '@shared/domain/pages';
import Link from 'next/link';

export default function NotFoundPage() {
  return (
    <SuccessfulAuth>
      <NotFoundPageContent
        title="Audience Builder"
        action={
          <Button size="sm" variant="primary" asChild>
            <Link href={PAGES_PATHS.home}>Go back to list</Link>
          </Button>
        }
      />
    </SuccessfulAuth>
  );
}
