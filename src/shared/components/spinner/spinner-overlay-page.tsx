import { Spinner } from '@purplelab/atoms-ui/spinner';

const SpinnerOverlayPage = () => {
  return (
    <div className="z-100 absolute flex min-h-screen w-full min-w-[1200px] items-center justify-center bg-system-neutral-100 opacity-70">
      <Spinner size="xl" />
    </div>
  );
};
export default SpinnerOverlayPage;
