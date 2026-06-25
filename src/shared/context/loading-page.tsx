'use client';

import SpinnerOverlayPage from '@shared/components/spinner/spinner-overlay-page';
import {
  createContext,
  ReactNode,
  useCallback,
  useContext,
  useMemo,
  useState
} from 'react';

interface LoadingContextType {
  loading: boolean;
  showLoading: () => void;
  hideLoading: () => void;
}

const LoadingContext = createContext<LoadingContextType | undefined>(undefined);

export const useLoadingContext = () => {
  const context = useContext(LoadingContext);
  if (context === undefined) {
    throw new Error('useLoading must be used within a LoadingProvider');
  }
  return context;
};

export const LoadingProvider = ({ children }: { children: ReactNode }) => {
  const [loading, setLoading] = useState(false);

  const showLoading = useCallback(() => setLoading(true), []);
  const hideLoading = useCallback(() => setLoading(false), []);

  const contextValue = useMemo(
    () => ({ loading, showLoading, hideLoading }),
    [loading, showLoading, hideLoading]
  );

  return (
    <LoadingContext.Provider value={contextValue}>
      {loading && <SpinnerOverlayPage />}
      {children}
    </LoadingContext.Provider>
  );
};
