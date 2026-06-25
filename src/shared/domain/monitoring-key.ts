import {
  DEVELOPMENT_ENVIRONMENT_TYPE,
  LOCALHOST_ENVIRONMENT_TYPE,
  PRODUCTION_ENVIRONMENT_TYPE
} from '@purplelab/services-ui/environments';
import { APP_ENV, MIXPANEL_KEY } from './env-variables';

const keyMonitoring: { [key: string]: string } = {
  [PRODUCTION_ENVIRONMENT_TYPE]: MIXPANEL_KEY ?? '',
  [DEVELOPMENT_ENVIRONMENT_TYPE]: '',
  [LOCALHOST_ENVIRONMENT_TYPE]: ''
};

export const KEY_MONITORING = keyMonitoring[APP_ENV] ?? '';
