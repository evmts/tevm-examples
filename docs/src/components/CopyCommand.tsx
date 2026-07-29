'use client'

import { useState } from 'react'

export function CopyCommand({ command, className }: { command: string; className?: string }) {
	const [copied, setCopied] = useState(false)

	async function copy() {
		try {
			await navigator.clipboard.writeText(command)
			setCopied(true)
			setTimeout(() => setCopied(false), 1500)
		} catch {
			// Clipboard access can be denied; leave the label unchanged.
		}
	}

	return (
		<div className={className ?? 'ex-install'}>
			<code>{command}</code>
			<button type="button" onClick={copy} aria-label="Copy command">
				{copied ? 'Copied' : 'Copy'}
			</button>
		</div>
	)
}
