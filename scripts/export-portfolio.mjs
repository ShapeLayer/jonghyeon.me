import { parseArgs } from 'node:util';
import { access, mkdir } from 'node:fs/promises';
import { dirname, join, resolve } from 'node:path';
import { homedir } from 'node:os';
import { fileURLToPath } from 'node:url';
import { chromium } from '@playwright/test';

// Some package managers forward the script argument separator to Node.
const args = process.argv.slice(2);
while (args[0] === '--') args.shift();

const { values } = parseArgs({
  args,
  options: {
    preset: { type: 'string', default: 'cv' },
    locale: { type: 'string', default: 'ko' },
    output: { type: 'string' },
    browser: { type: 'string' },
    help: { type: 'boolean', short: 'h' }
  }
});
if (values.help) {
  console.log('npm run portfolio -- [--preset=cv] [--locale=ko|en] [--output=path.pdf] [--browser=/path/to/chromium]');
  process.exit(0);
}
if (values.preset !== 'cv' || !['ko', 'en'].includes(values.locale)) {
  throw new Error('Supported options: --preset=cv and --locale=ko|en');
}

// Only this private export server renders the document. Public pages keep their UI.
process.env.VITE_PORTFOLIO = 'true';
const { createServer } = await import('vite');
const root = fileURLToPath(new URL('../', import.meta.url));
const output = resolve(values.output ?? `output/portfolio-${values.locale}.pdf`);

async function findBrowser() {
  if (values.browser) return resolve(values.browser);
  const candidates = [
    chromium.executablePath(),
    ...(process.platform === 'darwin' ? [
      '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome',
      join(homedir(), 'Applications/Google Chrome.app/Contents/MacOS/Google Chrome'),
      '/Applications/Chromium.app/Contents/MacOS/Chromium'
    ] : process.platform === 'win32' ? [
      ...[process.env.PROGRAMFILES, process.env['PROGRAMFILES(X86)'], process.env.LOCALAPPDATA]
        .filter(Boolean).map((directory) => join(directory, 'Google/Chrome/Application/chrome.exe'))
    ] : [
      '/usr/bin/google-chrome', '/usr/bin/google-chrome-stable',
      '/usr/bin/chromium', '/usr/bin/chromium-browser', '/snap/bin/chromium'
    ])
  ];
  for (const candidate of candidates) {
    try {
      await access(candidate);
      return candidate;
    } catch {
      // Try the next installed browser.
    }
  }
  throw new Error('No Chromium browser found. Run "pnpm exec playwright install chromium" or pass --browser=/path/to/browser.');
}

const executablePath = await findBrowser();
let server;
let browser;
try {
  process.chdir(root);
  server = await createServer({
    server: { host: '127.0.0.1', port: 0, open: false }
  });
  await server.listen();
  const address = server.httpServer.address();
  if (!address || typeof address === 'string') throw new Error('Export server failed to start');
  browser = await chromium.launch({
    headless: true,
    executablePath
  });
  const page = await browser.newPage({ locale: values.locale });
  const errors = [];
  page.on('pageerror', (error) => errors.push(error.message));
  await page.goto(`http://127.0.0.1:${address.port}/?preset=cv&locale=${values.locale}`);
  await page.locator('.portfolio-careers').waitFor();
  // Locale selection can reload the page once; wait for the requested language.
  await page.waitForFunction((locale) => document.documentElement.lang === locale, values.locale);
  await page.emulateMedia({ media: 'print' });
  await page.evaluate(async () => {
    // Embedded players cannot be used in a PDF; preserve their destinations as links.
    for (const frame of document.querySelectorAll('.cv-portfolio iframe')) {
      const link = document.createElement('a');
      const source = new URL(frame.src);
      const video = source.hostname.endsWith('youtube.com') && source.pathname.startsWith('/embed/')
        ? source.pathname.split('/')[2] : null;
      link.href = video ? `https://www.youtube.com/watch?v=${video}` : source.href;
      link.textContent = `${frame.title || 'Video'}: ${link.href}`;
      const paragraph = document.createElement('p');
      paragraph.append(link);
      frame.replaceWith(paragraph);
    }
    await document.fonts.ready;
    await Promise.all(Array.from(document.images).map(async (image) => {
      image.loading = 'eager';
      await image.decode();
    }));
    // Fit translated labels to their source-image rectangles before PDF pagination.
    for (const label of document.querySelectorAll('.portfolio-image-translation')) {
      let size = Math.min(label.clientHeight * 0.82, label.closest('.portfolio-image-stage').clientWidth * 0.014);
      label.style.fontSize = `${size}px`;
      while (size > 1 && (label.scrollWidth > label.clientWidth + 1 || label.scrollHeight > label.clientHeight + 1)) {
        size -= 0.2;
        label.style.fontSize = `${size}px`;
      }
      // Keep the fitted size proportional when the PDF page narrows the image.
      label.style.fontSize = `${size / label.closest('.portfolio-image-stage').clientWidth * 100}cqw`;
    }
  });
  if (errors.length) throw new Error(errors.join('\n'));
  await mkdir(dirname(output), { recursive: true });
  const footerText = values.locale === 'ko'
    ? '이 항목은 <a href="https://jonghyeon.me" style="color:inherit">https://jonghyeon.me</a> 에서 자세히 살펴볼 수 있습니다.'
    : 'Explore this work in more detail at <a href="https://jonghyeon.me" style="color:inherit">https://jonghyeon.me</a>.';
  await page.pdf({
    path: output, preferCSSPageSize: true, printBackground: true, tagged: true,
    displayHeaderFooter: true,
    headerTemplate: '<span></span>',
    footerTemplate: `<div style="width:100%;padding:0 15mm;box-sizing:border-box;display:flex;align-items:center;justify-content:space-between;font-family:Arial,'Apple SD Gothic Neo',sans-serif;font-size:8px;color:#505461;-webkit-print-color-adjust:exact;">
      <span>${footerText}</span>
      <span class="pageNumber" style="display:flex;align-items:center;justify-content:center;width:7mm;height:7mm;flex-shrink:0;background:#303644;color:#fff;font-size:11px;font-weight:600;"></span>
    </div>`
  });
  console.log(`Portfolio saved: ${output}`);
} finally {
  await browser?.close();
  await server?.close();
}
