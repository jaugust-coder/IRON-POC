import { ErrorService } from '@purplelab/services-ui/error-service';

type NetworkErrorHandlingConfig<TParams, TReturn> = {
  asyncFunc: (...args: TParams[]) => Promise<TReturn>;
  errorAdapter: (error: unknown) => ErrorService;
};

const withNetworkErrorHandlingAdapter = <TParams, TReturn>({
  asyncFunc,
  errorAdapter
}: NetworkErrorHandlingConfig<TParams, TReturn>) => {
  return async (...args: TParams[]): Promise<TReturn> => {
    try {
      return await asyncFunc(...args);
    } catch (error) {
      const errorService = errorAdapter(error);
      throw errorService;
    }
  };
};

export default withNetworkErrorHandlingAdapter;
