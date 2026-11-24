# Tevm examples

Standalone example applications for [Tevm](https://tevm.sh).

This repository was extracted from
[`evmts/tevm`](https://github.com/evmts/tevm) with its Git history intact. The applications install
Tevm packages from npm instead of using monorepo workspace links, so the workspace also acts as an integration smoke
test for the packages that Tevm users receive.

Documentation for this repository is published at [examples.tevm.sh](https://examples.tevm.sh). Umbrella Tevm
documentation remains at [tevm.sh](https://tevm.sh).

## Requirements

- Node.js 24 (the exact tested version is in `.nvmrc`)
- pnpm 9
- Bun 1.4 for the Bun example's e2e test and interactive runs
- Foundry only for the optional `apps/vite` `build:contracts` and deploy scripts

## Install

```sh
corepack enable
pnpm install
```

The apps live in [`apps/`](./apps/):

- `bun` — Bun and the Tevm Bun plugin
- `esbuild` — esbuild and the Tevm esbuild plugin
- `next` — Next.js with an in-browser Tevm memory client
- `svelte-ethers` — SvelteKit with the Tevm Ethers adapter
- `vite` — Vite, React, Wagmi, Ethers, and Solidity imports

## Documentation site

The site published at [examples.tevm.sh](https://examples.tevm.sh) lives in [`docs/`](./docs) and is built with
[Vocs](https://vocs.dev) 2.7.2.

```sh
pnpm docs:dev
pnpm docs:build
pnpm docs:preview
```

## Validate the workspace

```sh
pnpm lint
pnpm typecheck
pnpm build
pnpm test       # unit and fuzz tests
pnpm test:e2e   # end-to-end smoke test of every built example (run after build)
pnpm bench      # vitest benchmarks for the next and vite helpers
```

Every example has an offline `test:e2e` script:

| Example | What the e2e test proves |
| --- | --- |
| `bun` | `bun test` compiles `ExampleContract.sol` through the Bun plugin, deploys it to a memory EVM, and mints a token |
| `esbuild` | `dist/index.js` reads `ownerOf(1)` through a local JSON-RPC stub with the ABI the esbuild plugin compiled |
| `next`, `svelte-ethers`, `vite` | The production server serves `/` with the expected markup and every referenced script and stylesheet |

Fuzz tests use fast-check with a fixed seed. Set `FUZZ_SEED` and `FUZZ_RUNS` to explore further.

RPC-backed tests run only when their documented environment variable is present. Use `RPC_URL` for the Bun example
and `RPC_URL_MAINNET` for the esbuild example.

## Published-package policy

Cross-repository Tevm dependencies use caret ranges resolved from npm. The `tevm` meta-package is declared as a
runtime peer at `^1.0.0-next.149` where an example imports the node directly, and is installed as a development
dependency for local validation. No app depends on another workspace package.

## Releases

Changesets records release intent. Merges to `main` run the full lint, typecheck, build, test, and docs gates before
the release action publishes the five `@tevm/example-*` packages with npm provenance. The docs workspace remains private.

`apps/mud` was removed in November 2026: MUD is no longer maintained and `@tevm/mud` was archived without an npm
release. Its last version remains in the Git history.

## License

[MIT](./LICENSE)
