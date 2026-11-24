const features = [
	{
		title: 'Published packages only',
		body: 'Every app installs @tevm/* from npm — no workspace links, no monorepo internals. If it runs here, it runs for you.',
		code: 'npm install @tevm/contract',
	},
	{
		title: 'Five toolchains',
		body: 'Bun, esbuild, Vite, Next.js, and SvelteKit — the same Tevm APIs working across runtimes and bundlers.',
		code: 'apps/{bun,esbuild,vite,next,svelte-ethers}',
	},
	{
		title: 'Solidity imports everywhere',
		body: 'Import .sol files straight into TypeScript with fully typed contract objects via the Tevm bundler plugins.',
		code: "import { Counter } from './Counter.sol'",
	},
	{
		title: 'A real smoke test',
		body: 'pnpm build && pnpm test in this repo is an end-to-end check that a Tevm release installs, types, bundles, and runs.',
		code: 'pnpm build && pnpm test',
	},
	{
		title: 'Fork mainnet locally',
		body: 'The examples fork Ethereum mainnet into an in-memory EVM — read real state without an archive node.',
		code: "createMemoryClient({ fork: { url } })",
	},
	{
		title: 'Copy-paste starting points',
		body: 'Each app is a normal project. Clone the repo, or scaffold a single app with degit and start hacking.',
		code: 'pnpm dlx degit evmts/tevm-examples/apps/vite my-app',
	},
] as const

export function FeatureGrid() {
	return (
		<div className="ex-feature-grid">
			{features.map((f) => (
				<div key={f.title} className="ex-feature">
					<h3>{f.title}</h3>
					<p>{f.body}</p>
					<p style={{ marginTop: '0.5rem' }}>
						<code>{f.code}</code>
					</p>
				</div>
			))}
		</div>
	)
}
