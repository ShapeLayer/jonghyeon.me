import { test, expect } from '@playwright/test';

for (const locale of ['en', 'ko']) {
	test(`Svelte adapter preserves ${locale} labels, regions, SSR image and host popup behavior`, async ({
		page,
		request
	}, testInfo) => {
		const response = await request.get('/');
		const html = await response.text();
		expect(html).toContain('<zoomable-image');
		expect(html).toMatch(/<zoomable-image[^>]*>[\s\S]*?<img[^>]*loading="lazy"/);
		// Start SSR and hydration in the same locale to avoid a locale-switch reload.
		await page.context().addCookies([
			{
				name: 'PARAGLIDE_LOCALE',
				value: locale,
				url: testInfo.project.use.baseURL!
			}
		]);
		await page.addInitScript((selectedLocale) => {
			localStorage.setItem('user-locale-preference', selectedLocale);
		}, locale);
		await page.goto('/');
		const image = page.locator('zoomable-image[alt="Web UI"]');
		// Changing the locale can reload the page; locator assertions reacquire the element.
		await expect(image.locator('.trigger')).toHaveAttribute(
			'aria-label',
			locale === 'en' ? 'View larger image: Web UI' : '이미지 크게 보기: Web UI'
		);
		await page.locator('#algorithm-contest-operations').click();
		const popup = page.locator('#algorithm-contest-operations-detail .popup-content-wrapper');
		await expect(popup).toHaveCSS('left', '0px');
		await image.locator('.trigger').click();
		await expect(image.locator('dialog')).toBeVisible();
		await expect(image.locator('.caption')).not.toBeVisible();
		await expect(image).not.toHaveAttribute('caption', 'undefined');
		await expect(image.locator('.close')).toHaveAttribute(
			'aria-label',
			locale === 'en' ? 'Close' : '닫기'
		);
		await expect(image.locator('.image')).toHaveJSProperty('naturalWidth', 1280);
		const regions = await image.locator('.region').count();
		if (locale === 'en') expect(regions).toBeGreaterThan(0);
		else expect(regions).toBe(0);
		await page.screenshot({ path: testInfo.outputPath('viewer-default.png') });
		await image.locator('.in').click();
		await expect(image.locator('.level')).toHaveText('150%');
		if (regions) {
			await image.locator('.region').first().focus();
			await expect(image.locator('.tooltip')).toBeVisible();
		}
		await page.screenshot({ path: testInfo.outputPath('viewer.png') });
		await page.keyboard.press('Escape');
		await expect(image.locator('dialog')).not.toBeVisible();
		await expect(popup).toHaveCSS('left', '0px');
		await expect(image.locator('.trigger')).toBeFocused();
		await page.keyboard.press('Escape');
		await expect
			.poll(() => popup.evaluate((node) => parseFloat(getComputedStyle(node).left)))
			.toBeLessThan(0);
	});
}
