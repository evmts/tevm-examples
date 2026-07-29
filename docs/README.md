# Tevm examples documentation

The documentation site for this repository, published at [examples.tevm.sh](https://examples.tevm.sh).

Built with [Vocs](https://vocs.dev) **2.7.0**.

## Develop

```sh
pnpm install
pnpm docs:dev      # or: pnpm --filter @tevm/examples-docs dev
pnpm docs:build
pnpm docs:preview
```

## Layout

| Path | Contents |
| --- | --- |
| `src/pages/` | MDX pages. The route is the file path, e.g. `src/pages/guides/bun.mdx` → `/guides/bun` |
| `src/components/` | React components used by the landing page |
| `public/` | Static assets served from the site root |
| `vocs.config.ts` | Site config: nav, sidebar, theme, base URL |
| `vercel.json` | Vercel install/build commands and output directory |

Adding a page means adding the MDX file **and** a sidebar entry in `vocs.config.ts`.

## Notes on Vocs 2.x

This site was migrated from the Vocs 1.4.1 configuration used by the Tevm monorepo docs. The differences that
mattered:

- `defineConfig` is imported from `vocs/config`, not `vocs`. Importing the package root pulls in the React component
  entry points, which cannot be loaded while Vite is evaluating the config file.
- `theme.accentColor` / `theme.colorScheme` were flattened to top-level `accentColor` / `colorScheme`.
  `accentColor` accepts a CSS `light-dark(<light>, <dark>)` value, and `colorScheme` takes `'light dark'` rather
  than `'system'`.
- `editLink.pattern` was renamed to `editLink.link`.
- Pages are resolved at `<srcDir>/pages` with `srcDir` defaulting to `src` — 1.x looked in `<rootDir>/pages`.
- `renderStrategy` defaults to `'dynamic'` (a Node server). This site sets `'full-static'` so the build emits plain
  HTML for Vercel's static hosting.
- Static output lands in `dist/public`, which is what `vercel.json` points `outputDirectory` at.
- Vocs 2 requires React 19, Vite 8, and `waku`, and Waku needs `react-server-dom-webpack` — all are direct
  dependencies of this package.

## Deployment

Vercel builds this directory with the commands in `vercel.json`. `.github/workflows/docs.yml` builds the site on
every docs change and uploads the output as an artifact; it also contains a Vercel CLI deploy job that activates only
if `VERCEL_TOKEN` / `VERCEL_ORG_ID` / `VERCEL_PROJECT_ID` secrets are set, for repos not using Vercel's Git
integration.
