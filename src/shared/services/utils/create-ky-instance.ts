import ky from 'ky';
import { beforeRequest } from './beforeRequestBase';
import { MAX_REQUEST_TIMEOUT } from './max-request-base-timeout';

export const createKyInstance = (prefixUrl: string) => {
  return ky.create({
    prefixUrl,
    hooks: {
      beforeRequest: [beforeRequest]
    },
    timeout: MAX_REQUEST_TIMEOUT
  });
};
