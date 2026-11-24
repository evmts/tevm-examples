#!/usr/bin/env node
// End-to-end smoke test for a built web example.
//
// Usage (from an app directory):
//   node ../../scripts/smoke-http.mjs --marker "<text>" [--marker ...] -- <server command with {port}>
//
// Starts the production server on a free port, waits for `/` to return 200,
// asserts every marker appears in the HTML, then fetches every same-origin
// script, module import, and stylesheet the page references and asserts each returns 200.
import { spawn } from 'node:child_process'
import { createServer } from 'node:net'

const separator = process.argv.indexOf('--')
if (separator === -1 || separator === process.argv.length - 1) {
	console.error('usage: smoke-http.mjs --marker <text> -- <command with {port}>')
	process.exit(2)
}
const flags = process.argv.slice(2, separator)
const markers = []
for (let i = 0; i < flags.length; i++) {
	if (flags[i] === '--marker') markers.push(flags[++i])
}
const timeoutMs = Number(process.env.SMOKE_TIMEOUT_MS ?? 90_000)

const freePort = () =>
	new Promise((resolve, reject) => {
		const server = createServer()
		server.once('error', reject)
		server.listen(0, '127.0.0.1', () => {
			const { port } = server.address()
			server.close(() => resolve(port))
		})
	})

const port = await freePort()
const [command, ...args] = process.argv.slice(separator + 1).map((arg) => arg.replaceAll('{port}', String(port)))
const origin = `http://127.0.0.1:${port}`

let output = ''
const child = spawn(command, args, { detached: true, env: { ...process.env, PORT: String(port) } })
child.stdout.on('data', (chunk) => (output += chunk))
child.stderr.on('data', (chunk) => (output += chunk))
let exited = false
child.on('exit', () => (exited = true))

const stop = () => {
	if (exited) return
	try {
		process.kill(-child.pid, 'SIGTERM')
	} catch {}
}

const fail = (message) => {
	stop()
	console.error(`smoke: FAIL ${message}\n--- server output ---\n${output}`)
	process.exit(1)
}

const waitForPage = async () => {
	const deadline = Date.now() + timeoutMs
	while (Date.now() < deadline) {
		if (exited) fail(`server exited before serving ${origin}/`)
		try {
			const response = await fetch(`${origin}/`)
			if (response.status === 200) return response.text()
		} catch {}
		await new Promise((resolve) => setTimeout(resolve, 250))
	}
	fail(`timed out after ${timeoutMs}ms waiting for ${origin}/`)
}

const html = await waitForPage()
for (const marker of markers) {
	if (!html.includes(marker)) fail(`page is missing marker ${JSON.stringify(marker)}`)
}

const assets = new Set()
for (const [, url] of html.matchAll(/<script[^>]*\ssrc="([^"]+)"/g)) assets.add(url)
// SvelteKit boots from an inline script that dynamically imports its entries.
for (const [, url] of html.matchAll(/\bimport\("([^"]+\.js)"\)/g)) assets.add(url)
for (const [tag, url] of html.matchAll(/<link[^>]*\shref="([^"]+)"[^>]*>/g)) {
	if (/rel="(stylesheet|modulepreload)"/.test(tag)) assets.add(url)
}
const sameOrigin = [...assets].map((url) => new URL(url.replaceAll('&amp;', '&'), `${origin}/`)).filter((url) => url.origin === origin)
if (sameOrigin.length === 0) fail('page references no same-origin scripts or stylesheets')
for (const url of sameOrigin) {
	const response = await fetch(url)
	if (response.status !== 200) fail(`${url.pathname} returned ${response.status}`)
	await response.arrayBuffer()
}

stop()
console.log(`smoke: OK ${origin}/ (${markers.length} markers, ${sameOrigin.length} assets)`)
process.exit(0)
