import { fileURLToPath } from 'node:url';
import { defineConfig } from '@playwright/test';
import config from './playwright.config.js';
export default defineConfig({
  ...config,
  testDir: './test/integration',
  timeout: 30000,
  use: { ...config.use, baseURL: 'http://127.0.0.1:4175' },
  webServer: {
    cwd: fileURLToPath(new URL('../..', import.meta.url)),
    command: 'node node_modules/vite/bin/vite.js preview --host 127.0.0.1 --port 4175 --strictPort',
    url: 'http://127.0.0.1:4175',
    reuseExistingServer: false
  }
});
