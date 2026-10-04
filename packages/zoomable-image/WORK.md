# ZoomableImage package readiness

Verified on 2026-10-04 for `@shapelayer/zoomable-image@0.1.0`.

## Completed

| Requirement                  | Implementation / evidence                                                                                                                                     |
| ---------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Standard Web Component       | Custom Elements v1, Shadow DOM, native modal dialog; no runtime dependencies                                                                                  |
| Zoom / pan                   | 50–400% steps, bounded pointer pan, keyboard shortcuts, reset                                                                                                 |
| Caption                      | Reactive plain-text caption, wrapping and overflow, dialog description                                                                                        |
| Annotation                   | Validated image-relative percentage regions, hover/focus/activation tooltip, typed activation event                                                           |
| Public API                   | Reflected attributes/properties, structured properties, methods, typed composed/bubbling events                                                               |
| Styling / tooling            | CSS parts and variables, Custom Elements Manifest                                                                                                             |
| Accessibility / lifecycle    | Native modal focus containment, focus restoration, scroll-lock reference counting, removal cleanup and reconnection                                           |
| Framework independence / SSR | ESM, SSR-safe import, automatic/explicit registration; Svelte adapter with fallback image and localized labels                                                |
| Package metadata             | MIT license, version, exports, repository, file allowlist, README and changelog                                                                               |
| Unit / type validation       | 4 unit tests pass; library and browser/integration test TypeScript checks pass                                                                                |
| Browser validation           | 60 tests pass across Chromium, Firefox, WebKit, Android Chromium emulation and iPhone WebKit emulation                                                        |
| Host integration             | 10 English/Korean production-site tests pass across those five projects; image dimensions, annotations, labels, focus and surrounding popup behavior verified |
| Visual review                | Production-viewer desktop and mobile screenshots inspected                                                                                                    |
| Consumer validation          | Actual npm tarball installed into an isolated project; ESM exports, SSR import, register entry, declarations and typed events verified                        |
| CI / release workflow        | Verification and manual publish workflows written; actionlint passes; release requires main branch and exact manifest version                                 |
| Code quality                 | Changed package/adapter ESLint and Prettier checks pass; git diff whitespace check passes                                                                     |
| Host build                   | Production build passes; Svelte check has 0 errors and 22 pre-existing warnings                                                                               |
| Publish dry-run              | Successful for the final tarball; dry-run integrity matches npm pack integrity                                                                                |

## Release artifact

- File: `shapelayer-zoomable-image-0.1.0.tgz` (generated locally, ignored by Git)
- Compressed size: 13,222 bytes
- SHA-256: `b97b821ce8aad94f3a5e19428c472bda220c457d521f42725634738311637e29`
- Included: ESM and declarations, README, changelog, MIT license, Custom Elements Manifest, package metadata.
- No test/source/workspace artifacts or runtime dependencies are published.

## Publication handoff

The package artifact is ready for publication. No registry upload, commit, push, or GitHub workflow dispatch was performed. npm authentication and access to the `@shapelayer` scope are required for actual publication. The registry returned 404 for this exact package name during the availability check; this proves absence of an existing public package, not scope ownership.

Use the README release instructions for local first publication or configure the manual GitHub release workflow. GitHub Actions has been statically checked but has not been run remotely from this working tree.

## Validation limits

- Touch projects are browser emulations, not physical-device tests.
- macOS 27 bundled Firefox required an isolated test-app launcher due to the upstream shared app-data issue. This changed only the local test installation in `/private/tmp`; the package and Linux CI use standard Firefox APIs/configuration.
- The initial API covers stepped zoom and single-pointer pan. Wheel/pinch zoom, annotation authoring and HTML captions are outside version 0.1.0.

## Annotation color customization

Annotation normal background, hover/keyboard-focus background, and border colors are configurable through documented CSS custom properties. Existing colors remain the defaults. Chromium computed-style verification passes for defaults and overrides in all three states. The tarball was regenerated and its npm publish dry-run passes with matching integrity.

## Development-server regression fix

The initial verification used production preview and missed SvelteKit’s development filesystem allowlist. The host Vite config now adds the workspace package dist directory while retaining strict serving restrictions. All 10 localized host integration tests pass against the real Vite development server across five browser projects. CI now runs both preview and development-server checks.

## Original UI restoration

Restored compact desktop controls (22px height, 11px label), original annotation colors, and larger full-viewport-centered images without a caption. Null/undefined caption setters remove the attribute and the Svelte adapter supplies an empty caption for omitted props. Tooltips use 12px text, center above a region when space permits, and fall back below. Dimensions use pixel constants with responsive viewport bounds. Added sizing, caption, colors and tooltip placement regression checks; 60 browser cases and 10 development integration cases pass.

The restored UI also passes all 10 production integration cases. Desktop default-zoom screenshot reviewed; tarball rebuilt and publish dry-run integrity matches.
