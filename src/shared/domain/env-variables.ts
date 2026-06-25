import ServicesContextManager from '@purplelab/services-ui/services-context-manager';
import { z } from 'zod';

const envSchema = z.object({
  NEXT_PUBLIC_APP_ENV: z.string().min(1, 'APP_ENV is required'),
  NEXT_PUBLIC_HEALTHNEXUS_API_KEY: z
    .string()
    .min(1, 'HELTHNEXUS_API_KEY is required'),
  NEXT_PUBLIC_AGGRID_LICENSE_KEY: z
    .string()
    .min(1, 'NEXT_PUBLIC_AGGRID_LICENSE_KEY is required'),
  NEXT_PUBLIC_MIXPANEL_KEY: z.string().optional(),
  NEXT_PUBLIC_ADVERTISING_KEY_APP: z.string().optional()
});

const { data, success, error } = envSchema.safeParse({
  NEXT_PUBLIC_APP_ENV: process.env.NEXT_PUBLIC_APP_ENV,
  NEXT_PUBLIC_HEALTHNEXUS_API_KEY: process.env.NEXT_PUBLIC_HEALTHNEXUS_API_KEY,
  NEXT_PUBLIC_AGGRID_LICENSE_KEY: process.env.NEXT_PUBLIC_AGGRID_LICENSE_KEY,
  NEXT_PUBLIC_MIXPANEL_KEY: process.env.NEXT_PUBLIC_MIXPANEL_KEY,
  NEXT_PUBLIC_ADVERTISING_KEY_APP: process.env.NEXT_PUBLIC_ADVERTISING_KEY_APP
});

if (!success) {
  // eslint-disable-next-line no-console
  console.error(z.treeifyError(error));
  throw new Error('Audience Builder needs to setup env variables first');
}

export const {
  NEXT_PUBLIC_APP_ENV: APP_ENV,
  NEXT_PUBLIC_HEALTHNEXUS_API_KEY: HEALTHNEXUS_API_KEY,
  NEXT_PUBLIC_AGGRID_LICENSE_KEY: AGGRID_LICENSE_KEY,
  NEXT_PUBLIC_MIXPANEL_KEY: MIXPANEL_KEY,
  NEXT_PUBLIC_ADVERTISING_KEY_APP: ADVERTISING_KEY_APP
} = data;

ServicesContextManager.initialize({
  currentEnv: APP_ENV,
  healthNexusApiKey: HEALTHNEXUS_API_KEY
});
