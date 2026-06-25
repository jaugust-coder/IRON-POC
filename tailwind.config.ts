// tailwind config is required for editor support

import type { Config } from 'tailwindcss';
import sharedConfig from '@purplelab/tailwind-config';
import path from 'node:path';

const config: Pick<Config, 'content' | 'presets'> = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './pages/*.{js,ts,jsx,tsx,mdx}',
    './src/modules/**/*.{js,ts,jsx,tsx,mdx}',
    './src/shared/**/*.{js,ts,jsx,tsx,mdx}',
    './src/shared/presentation/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './app/*.{js,ts,jsx,tsx,mdx}',
    path.join(
      path.dirname(require.resolve('@purplelab/atoms-ui')),
      '**/*.{js,ts,jsx,tsx,mdx}'
    ),
    path.join(
      path.dirname(require.resolve('@purplelab/icons-ui')),
      '**/*.{js,ts,jsx,tsx,mdx}'
    ),
    path.join(
      path.dirname(require.resolve('@purplelab/organisms-ui')),
      '**/*.{js,ts,jsx,tsx,mdx}'
    )
  ],
  presets: [sharedConfig]
};

export default config;
