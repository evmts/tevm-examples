import type { ReactNode } from 'react'

export function CodeWindow({ title, children }: { title: string; children: ReactNode }) {
	return (
		<div className="ex-sample">
			<div className="ex-sample-head">
				<span className="ex-dot" />
				<span className="ex-dot" />
				<span className="ex-dot" />
				<span className="ex-sample-title">{title}</span>
			</div>
			{children}
		</div>
	)
}
