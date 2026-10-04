import { defineConfig } from '@playwright/test';
import config from './playwright.integration.config.js';
export default defineConfig({
  ...config,
  webServer: {
    ...config.webServer,
    command: 'node node_modules/vite/bin/vite.js dev --host 127.0.0.1 --port 4175 --strictPort'
  }
});
