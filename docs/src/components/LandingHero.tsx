import { CopyCommand } from './CopyCommand'

const cloneCommand = 'git clone https://github.com/evmts/tevm-examples.git && cd tevm-examples && pnpm install'

export function LandingHero() {
	return (
		<div className="ex-hero">
			<div className="ex-hero-inner">
				<span className="ex-eyebrow">evmts/tevm-examples · examples.tevm.sh</span>
				<h1>
					Tevm examples that run against <span className="ex-grad">what npm actually serves.</span>
				</h1>
				<p className="ex-lede">
					Six standalone apps — Bun, esbuild, Vite, Next.js, SvelteKit, and MUD — each installing Tevm from the
					published registry with zero workspace links. Copy any of them as a starting point, or treat the repo as
					what it also is: Tevm's end-to-end integration smoke test.
				</p>
				<CopyCommand command={cloneCommand} />
				<div className="ex-hero-actions">
					<a className="ex-btn ex-btn-primary" href="/getting-started">
						Get started
					</a>
					<a className="ex-btn ex-btn-ghost" href="/guides/solidity-imports">
						Solidity imports
					</a>
					<a
						className="ex-btn ex-btn-ghost"
						href="https://github.com/evmts/tevm-examples"
						target="_blank"
						rel="noreferrer"
					>
						GitHub
					</a>
				</div>
			</div>
		</div>
	)
}
