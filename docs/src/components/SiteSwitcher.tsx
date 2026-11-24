const sites = [
	{ name: 'tevm.sh', href: 'https://tevm.sh', desc: 'The umbrella package and project docs' },
	{ name: 'utils.tevm.sh', href: 'https://utils.tevm.sh', desc: 'Shared low-level utilities' },
	{ name: 'contract.tevm.sh', href: 'https://contract.tevm.sh', desc: 'Typed contract objects' },
	{ name: 'logger.tevm.sh', href: 'https://logger.tevm.sh', desc: 'Structured EVM logging' },
	{ name: 'test.tevm.sh', href: 'https://test.tevm.sh', desc: 'Matchers and test utilities' },
	{ name: 'ethers.tevm.sh', href: 'https://ethers.tevm.sh', desc: 'The ethers.js adapter' },
	{ name: 'cli.tevm.sh', href: 'https://cli.tevm.sh', desc: 'The tevm command line' },
	{ name: 'bundler.tevm.sh', href: 'https://bundler.tevm.sh', desc: 'Solidity imports for your bundler' },
	{ name: 'examples.tevm.sh', href: 'https://examples.tevm.sh', desc: 'Runnable example apps', current: true },
] as const

export function SiteSwitcher() {
	return (
		<div className="ex-sites">
			{sites.map((site) => (
				<a
					key={site.name}
					className="ex-site"
					href={site.href}
					{...('current' in site && site.current ? { 'aria-current': 'page' as const } : {})}
				>
					<span className="ex-site-name">{site.name}</span>
					<span className="ex-site-desc">{site.desc}</span>
				</a>
			))}
		</div>
	)
}
