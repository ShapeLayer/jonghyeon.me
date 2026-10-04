import { test, expect } from '@playwright/test';
import type { ZoomableImage } from '../../src/index.js';

for (const locale of ['en', 'ko']) {
  test(`Svelte adapter preserves ${locale} labels, regions, SSR image and host popup behavior`, async ({
    page,
    request
  }, testInfo) => {
    const response = await request.get('/');
    const html = await response.text();
    expect(html).toContain('<zoomable-image');
    expect(html).toMatch(/<zoomable-image[^>]*>[\s\S]*?<img[^>]*loading="lazy"/);
    await page.goto(`/?locale=${locale}`);
    const image = page.locator('zoomable-image[alt="Web UI"]');
    await expect
      .poll(() => image.evaluate((node) => (node as ZoomableImage).labels?.open))
      .toBe(locale === 'en' ? 'View larger image' : '이미지 크게 보기');
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
    await expect
      .poll(() =>
        image.locator('.image').evaluate((node) => (node as HTMLImageElement).naturalWidth)
      )
      .toBe(1280);
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
