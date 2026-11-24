import { defineConfig } from 'vocs/config'

export default defineConfig({
	title: 'Tevm Examples',
	titleTemplate: '%s · Tevm Examples',
	description: 'Runnable Tevm example applications that consume the published npm packages',
	rootDir: '.',
	// vocs 2.x resolves pages at `<srcDir>/pages` (1.x looked at `<rootDir>/pages`),
	// so the MDX lives in `src/pages` and the default `srcDir: 'src'` applies.
	// Static export: Vercel serves the generated HTML directly (2.x defaults to a Node server).
	renderStrategy: 'full-static',
	baseUrl: 'https://examples.tevm.sh',

	// vocs 2.x: `theme.accentColor` / `theme.colorScheme` were flattened onto the
	// root config, and `accentColor` accepts a CSS `light-dark()` value.
	accentColor: 'light-dark(#0085FF, #3AA0FF)',
	colorScheme: 'light dark',
	logoUrl: { light: '/tevm-logo-light.png', dark: '/tevm-logo-dark.png' },
	iconUrl: { light: '/tevm-logo-light.png', dark: '/tevm-logo-dark.png' },

	topNav: [
		{ text: 'Getting started', link: '/getting-started', match: '/getting-started' },
		{ text: 'Guides', link: '/guides/bun', match: '/guides' },
		{ text: 'Reference', link: '/reference/overview', match: '/reference' },
		{
			text: 'tevm.sh family',
			items: [
				{ text: 'tevm.sh — core', link: 'https://tevm.sh' },
				{ text: 'utils.tevm.sh', link: 'https://utils.tevm.sh' },
				{ text: 'contract.tevm.sh', link: 'https://contract.tevm.sh' },
				{ text: 'logger.tevm.sh', link: 'https://logger.tevm.sh' },
				{ text: 'test.tevm.sh', link: 'https://test.tevm.sh' },
				{ text: 'ethers.tevm.sh', link: 'https://ethers.tevm.sh' },
				{ text: 'cli.tevm.sh', link: 'https://cli.tevm.sh' },
				{ text: 'bundler.tevm.sh', link: 'https://bundler.tevm.sh' },
				{ text: 'examples.tevm.sh', link: 'https://examples.tevm.sh' },
			],
		},
		{
			text: 'Ecosystem',
			items: [
				{ text: 'Tevm docs', link: 'https://tevm.sh' },
				{ text: 'Tevm Node docs', link: 'https://node.tevm.sh' },
				{ text: 'evmts/tevm', link: 'https://github.com/evmts/tevm' },
				{ text: 'tevm-examples', link: 'https://github.com/evmts/tevm-examples' },
			],
		},
	],

	sidebar: [
		{
			text: 'Introduction',
			collapsed: false,
			items: [
				{ text: 'Overview', link: '/' },
				{ text: 'Getting started', link: '/getting-started' },
				{ text: 'How this repo relates to Tevm', link: '/ecosystem/repo-map' },
			],
		},
		{
			text: 'Guides',
			collapsed: false,
			items: [
				{ text: 'Solidity imports', link: '/guides/solidity-imports' },
				{ text: 'Bun', link: '/guides/bun' },
				{ text: 'esbuild', link: '/guides/esbuild' },
				{ text: 'Vite + React', link: '/guides/vite' },
				{ text: 'Next.js', link: '/guides/next' },
				{ text: 'SvelteKit + Ethers', link: '/guides/svelte-ethers' },
			],
		},
		{
			text: 'Reference',
			collapsed: false,
			items: [
				{ text: 'Overview', link: '/reference/overview' },
				{ text: 'Bun example API', link: '/reference/bun' },
				{ text: 'esbuild example API', link: '/reference/esbuild' },
				{ text: 'Shared conventions', link: '/reference/conventions' },
				{ text: 'Testing', link: '/reference/testing' },
			],
		},
	],

	socials: [{ icon: 'github', link: 'https://github.com/evmts/tevm-examples' }],

	editLink: {
		link: 'https://github.com/evmts/tevm-examples/edit/main/docs/src/pages/:path',
		text: 'Edit on GitHub',
	},
})
