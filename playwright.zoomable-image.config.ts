import { defineConfig, devices } from '@playwright/test';
export default defineConfig({
	testDir: './tests/zoomable-image',
	timeout: 30000,
	fullyParallel: true,
	workers: 3,
	reporter: 'list',
	use: { baseURL: 'http://127.0.0.1:4175', trace: 'retain-on-failure' },
	webServer: {
		command: 'node node_modules/vite/bin/vite.js preview --host 127.0.0.1 --port 4175 --strictPort',
		url: 'http://127.0.0.1:4175',
		reuseExistingServer: false
	},
	projects: [
		{ name: 'chromium', use: { ...devices['Desktop Chrome'] } },
		{
			name: 'firefox',
			use: {
				...devices['Desktop Firefox'],
				launchOptions: { executablePath: process.env.ZOOMABLE_FIREFOX_EXECUTABLE }
			}
		},
		{ name: 'webkit', use: { ...devices['Desktop Safari'] } },
		{ name: 'mobile-chromium', use: { ...devices['Pixel 7'] } },
		{ name: 'mobile-webkit', use: { ...devices['iPhone 13'] } }
	]
});
