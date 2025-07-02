import path from 'path';
import type { StorybookConfig } from '@storybook/nextjs';

const config: StorybookConfig = {
  webpackFinal: async (config) => {
    config.resolve!.alias = {
      ...(config.resolve!.alias || {}),
      'next/navigation': path.resolve(__dirname, '../__mocks__/next/navigation.ts'),
    };
    return config;
  },
  "stories": [
    "../src/**/*.mdx",
    "../src/**/*.stories.@(js|jsx|mjs|ts|tsx)"
  ],
  "addons": [
    "@storybook/addon-essentials",
    "@storybook/addon-onboarding",
    "@chromatic-com/storybook",
    "@storybook/experimental-addon-test"
  ],
  "framework": {
    "name": "@storybook/nextjs",
    "options": {}
  },
  "staticDirs": [
    "../public"
  ]
};
export default config;