# sv

Everything you need to build a Svelte project, powered by [`sv`](https://github.com/sveltejs/cli).

## Creating a project

If you're seeing this, you've probably already done this step. Congrats!

```bash
# create a new project in the current directory
npx sv create

# create a new project in my-app
npx sv create my-app
```

## Developing

Once you've created a project and installed dependencies with `npm install` (or `pnpm install` or `yarn`), start a development server:

```bash
npm run dev

# or start the server and open the app in a new browser tab
npm run dev -- --open
```

## Building

To create a production version of your app:

```bash
npm run build
```

You can preview the production build with `npm run preview`.

> To deploy your app, you may need to install an [adapter](https://svelte.dev/docs/kit/adapters) for your target environment.

## Zoomable Image package

The site's image viewer is maintained as an independent package named `@shapelayer/zoomable-image`.
See [package documentation](https://github.com/ShapeLayer/zoomable-image#readme) for the Web Component API,
verification commands, and release steps. The Svelte component is a client-side adapter
with an SSR fallback image.

The viewer repository is pinned as a Git submodule at `packages/zoomable-image`.
Initialize submodules before installing dependencies:

```sh
git submodule update --init --recursive
pnpm --ignore-workspace --dir packages/zoomable-image install --frozen-lockfile
pnpm install --frozen-lockfile
pnpm dev
pnpm test:zoomable-image:integration
pnpm test:zoomable-image:dev
```

Package CI and npm release workflows live in the separate package repository.

To update the viewer, check out the desired commit in `packages/zoomable-image`, verify the site, and commit the submodule pointer in this repository. CI checks out the pinned commit recursively.
