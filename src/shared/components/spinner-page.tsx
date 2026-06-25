import { cn } from '@purplelab/atoms-ui/utils';
import { Spinner } from '@purplelab/atoms-ui/spinner';

const SpinnerPage = ({ className }: { className?: string }) => {
  return (
    <div
      className={cn(
        `flex min-h-screen w-full items-center justify-center`,
        className
      )}
    >
      <Spinner size="xl" />
    </div>
  );
};
export default SpinnerPage;
