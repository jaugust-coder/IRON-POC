import {
  DEVELOPMENT_ENVIRONMENT_TYPE,
  LOCALHOST_ENVIRONMENT_TYPE,
  PRODUCTION_ENVIRONMENT_TYPE
} from '@purplelab/services-ui/environments';
import { ADVERTISING_KEY_APP, APP_ENV } from './env-variables';
import { ENV_KEY_STAGGING, ENV_KEY_BETA } from './env-custom';

const appUrlByEnv: { [key: string]: string } = {
  [PRODUCTION_ENVIRONMENT_TYPE]:
    ADVERTISING_KEY_APP === ENV_KEY_STAGGING
      ? 'https://stg-advertising.healthnexus.io'
      : 'https://advertising.healthnexus.io',
  [DEVELOPMENT_ENVIRONMENT_TYPE]:
    ADVERTISING_KEY_APP === ENV_KEY_BETA
      ? 'https://dev-audience-builder.healthnexus.io'
      : 'https://dev-advertising.healthnexus.io',
  [LOCALHOST_ENVIRONMENT_TYPE]: 'http://localhost:3082'
};

export const APP_URL = appUrlByEnv[APP_ENV] ?? '';
