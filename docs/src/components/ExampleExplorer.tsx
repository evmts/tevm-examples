'use client'

import { useState } from 'react'

type Example = {
	name: string
	stack: string
	guide: string
	desc: string
	pkgs: readonly string[]
	scaffold: string
}

const examples: readonly Example[] = [
	{
		name: 'apps/bun',
		stack: 'Bun',
		guide: '/guides/bun',
		desc: 'Bun runtime with the Tevm Bun plugin: import a .sol file, fork mainnet, and read a contract with createMemoryClient.',
		pkgs: ['@tevm/contract', '@tevm/bun-plugin', 'viem'],
		scaffold: 'pnpm dlx degit evmts/tevm-examples/apps/bun my-app',
	},
	{
		name: 'apps/esbuild',
		stack: 'esbuild',
		guide: '/guides/esbuild',
		desc: 'esbuild bundling with the Tevm esbuild plugin and a viem public client reading from a forked memory client.',
		pkgs: ['@tevm/contract', '@tevm/esbuild-plugin', 'viem'],
		scaffold: 'pnpm dlx degit evmts/tevm-examples/apps/esbuild my-app',
	},
	{
		name: 'apps/vite',
		stack: 'Vite',
		guide: '/guides/vite',
		desc: 'Vite + React + Wagmi + Ethers with a Foundry project and in-browser solc — the full frontend stack.',
		pkgs: ['@tevm/contract', 'wagmi', 'ethers', 'viem'],
		scaffold: 'pnpm dlx degit evmts/tevm-examples/apps/vite my-app',
	},
	{
		name: 'apps/next',
		stack: 'Next.js',
		guide: '/guides/next',
		desc: 'Next.js app router running an in-browser Tevm memory client — no backend RPC required.',
		pkgs: ['@tevm/contract', 'next', 'viem'],
		scaffold: 'pnpm dlx degit evmts/tevm-examples/apps/next my-app',
	},
	{
		name: 'apps/svelte-ethers',
		stack: 'Svelte',
		guide: '/guides/svelte-ethers',
		desc: 'SvelteKit wired to Tevm through the @tevm/ethers adapter — Tevm behind a familiar ethers.js interface.',
		pkgs: ['@tevm/contract', '@tevm/ethers', 'ethers'],
		scaffold: 'pnpm dlx degit evmts/tevm-examples/apps/svelte-ethers my-app',
	},
	{
		name: 'apps/mud',
		stack: 'MUD',
		guide: '/guides/mud',
		desc: 'A React MUD application — onchain state synced to the client with Tevm underneath.',
		pkgs: ['@latticexyz/store', '@tevm/contract', 'viem'],
		scaffold: 'pnpm dlx degit evmts/tevm-examples/apps/mud my-app',
	},
]

const stacks = ['All', ...Array.from(new Set(examples.map((e) => e.stack)))] as const

export function ExampleExplorer() {
	const [stack, setStack] = useState<(typeof stacks)[number]>('All')
	const [copied, setCopied] = useState<string | null>(null)

	const visible = stack === 'All' ? examples : examples.filter((e) => e.stack === stack)

	async function copy(scaffold: string) {
		try {
			await navigator.clipboard.writeText(scaffold)
			setCopied(scaffold)
			setTimeout(() => setCopied(null), 1500)
		} catch {
			// Clipboard access can be denied; leave the label unchanged.
		}
	}

	return (
		<div className="ex-explorer">
			<div className="ex-explorer-head">
				<h3>Pick a stack</h3>
				{stacks.map((s) => (
					<button key={s} type="button" className="ex-tab" aria-pressed={stack === s} onClick={() => setStack(s)}>
						{s}
					</button>
				))}
			</div>
			<div className="ex-cards">
				{visible.map((e) => (
					<div key={e.name} className="ex-card">
						<div className="ex-card-top">
							<a className="ex-card-name" href={e.guide}>
								{e.name}
							</a>
							<span className="ex-card-stack">{e.stack}</span>
						</div>
						<p className="ex-card-desc">{e.desc}</p>
						<div className="ex-card-pkgs">
							{e.pkgs.map((p) => (
								<span key={p} className="ex-pkg">
									{p}
								</span>
							))}
						</div>
						<div className="ex-card-cmd">
							<code>{e.scaffold}</code>
							<button type="button" onClick={() => copy(e.scaffold)} aria-label={`Copy scaffold command for ${e.name}`}>
								{copied === e.scaffold ? 'Copied' : 'Copy'}
							</button>
						</div>
					</div>
				))}
			</div>
		</div>
	)
}
