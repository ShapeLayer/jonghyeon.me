import { defineConfig } from '@playwright/test';
import config from './playwright.zoomable-image.config.js';
export default defineConfig({
	...config,
	timeout: 60000,
	expect: { timeout: 15000 },
	webServer: {
		...config.webServer,
		command: 'node node_modules/vite/bin/vite.js dev --host 127.0.0.1 --port 4175 --strictPort'
	}
});
