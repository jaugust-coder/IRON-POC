/// <reference types="vitest" />
/// <reference types="vite/client" />

import { defineConfig } from 'vitest/config';
import react from '@vitejs/plugin-react';
import tsconfigPaths from 'vite-tsconfig-paths';
import { loadEnv } from 'vite';
import { resolve } from 'node:path';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [tsconfigPaths(), react()],
  resolve: {
    alias: {
      'mixpanel-browser/src/loaders/loader-module-core':
        'mixpanel-browser/src/loaders/loader-module-core.js'
    }
  },
  optimizeDeps: {
    include: ['@purplelab/organisms-ui'],
    exclude: ['mixpanel-browser']
  },
  test: {
    globals: true,
    setupFiles: [
      'allure-vitest/setup',
      resolve(__dirname, './src/shared/test/setup.tsx')
    ],
    environment: 'jsdom',
    coverage: {
      provider: 'v8', // Añadido para mejor performance
      reporter: ['text', 'lcov', 'html'],
      exclude: [
        'node_modules/',
        '.next/',
        'dist/',
        'build/',
        'coverage/',
        'allure-custom/',
        '.github/',
        '**/*.config.{js,ts,mjs,mts}',
        '**/*.d.ts',
        '**/types.ts',
        '**/__tests__/**',
        '**/test/**',
        '**/*mock*.{ts,tsx,js,jsx,mts,mjs}',
        '**/*.test.{ts,tsx,js,jsx,mts,mjs}',
        '**/*.spec.{ts,tsx,js,jsx,mts,mjs}'
      ],
      include: ['src/**/*.{ts,tsx}', 'app/**/*.{ts,tsx}']
    },
    env: loadEnv('', process.cwd(), ''),
    reporters: [
      'default',
      'vitest-sonar-reporter',
      [
        'allure-vitest/reporter',
        {
          resultsDir: './allure-results',
          suiteTitle: true, // Muestra el título de la suite
          categories: [
            {
              name: 'Broken tests',
              matchedStatuses: ['broken']
            },
            {
              name: 'Failed tests',
              matchedStatuses: ['failed']
            },
            {
              name: 'Flaky tests',
              messageRegex: '.*retry.*'
            }
          ],
          environmentInfo: {
            Project: 'Advertising - Audience Builder',
            Environment: process.env.NEXT_PUBLIC_APP_ENV || 'Dev',
            'Node Version': process.version,
            Platform: process.platform
          }
        }
      ]
    ],
    outputFile: {
      'vitest-sonar-reporter': 'test-results.xml'
    },
    server: {
      deps: {
        inline: ['@purplelab/organisms-ui']
      }
    }
  }
});
