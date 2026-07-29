# Tevm examples

Standalone example applications for [Tevm](https://tevm.sh).

This repository was extracted from
[`evmts/tevm-monorepo`](https://github.com/evmts/tevm-monorepo) with its Git history intact. The applications install
Tevm packages from npm instead of using monorepo workspace links, so the workspace also acts as an integration smoke
test for the packages that Tevm users receive.

Documentation for this repository is published at [examples.tevm.sh](https://examples.tevm.sh). Umbrella Tevm
documentation remains at [tevm.sh](https://tevm.sh).

## Requirements

- Node.js 24 (the exact tested version is in `.nvmrc`)
- pnpm 9
- Foundry for the Solidity-backed Vite and MUD examples
- Bun only when running the Bun example interactively

## Install

```sh
corepack enable
pnpm install
```

The apps live in [`apps/`](./apps/):

- `bun` — Bun and the Tevm Bun plugin
- `esbuild` — esbuild and the Tevm esbuild plugin
- `mud` — a React MUD application
- `next` — Next.js with an in-browser Tevm memory client
- `svelte-ethers` — SvelteKit with the Tevm Ethers adapter
- `vite` — Vite, React, Wagmi, Ethers, and Solidity imports

## Documentation site

The site published at [examples.tevm.sh](https://examples.tevm.sh) lives in [`docs/`](./docs) and is built with
[Vocs](https://vocs.dev) 2.7.0.

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
pnpm test
```

RPC-backed tests run only when their documented environment variable is present. Use `RPC_URL` for the Bun example
and `RPC_URL_MAINNET` for the esbuild example.

## Published-package policy

Cross-repository Tevm dependencies use caret ranges resolved from npm. The `tevm` meta-package is declared as a
runtime peer where an example imports the node directly, and is installed as a development dependency for local
validation. The only workspace dependency is the MUD client's link to its contracts package, because both live in
this repository.

## Releases

Changesets records release intent. Merges to `main` run the release workflow with npm provenance. The example
workspaces are private applications, so they are versioned and tagged but are not published as npm libraries unless
their `private` flags are deliberately removed.

## License

[MIT](./LICENSE)
