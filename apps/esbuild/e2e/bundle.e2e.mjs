// End-to-end test for the esbuild bundle.
//
// Runs the built `dist/index.js` against a local JSON-RPC stub instead of
// mainnet. The stub answers `eth_call` for `ownerOf(1)` on the example
// deployment, so the test proves the whole path works offline: the esbuild
// plugin compiled `ExampleContract.sol`, viem encoded the call from that ABI,
// and the bundle decoded and printed the result.
import { execFile } from 'node:child_process'
import { existsSync } from 'node:fs'
import { createServer } from 'node:http'
import { fileURLToPath } from 'node:url'
import { promisify } from 'node:util'
import { addresses } from '../src/addresses.js'

const bundle = fileURLToPath(new URL('../dist/index.js', import.meta.url))
if (!existsSync(bundle)) {
	console.error('e2e: dist/index.js is missing; run `pnpm build` first')
	process.exit(1)
}

const owner = '0x1a1E021A302C237453D3D45c7B82B19cEEB7E2e6'
// keccak256("ownerOf(uint256)")[0:4] followed by tokenId 1.
const expectedData = `0x6352211e${'1'.padStart(64, '0')}`
const calls = []

const server = createServer(async (request, response) => {
	let body = ''
	for await (const chunk of request) body += chunk
	const payload = JSON.parse(body)
	const answer = ({ id, method, params }) => {
		calls.push({ method, params })
		if (method === 'eth_chainId') return { jsonrpc: '2.0', id, result: '0x1' }
		if (method === 'eth_call') {
			return { jsonrpc: '2.0', id, result: `0x${owner.slice(2).toLowerCase().padStart(64, '0')}` }
		}
		return { jsonrpc: '2.0', id, error: { code: -32601, message: `unexpected method ${method}` } }
	}
	response.setHeader('content-type', 'application/json')
	response.end(JSON.stringify(Array.isArray(payload) ? payload.map(answer) : answer(payload)))
})
await new Promise((resolve) => server.listen(0, '127.0.0.1', resolve))
const rpcUrl = `http://127.0.0.1:${server.address().port}`

const fail = (message) => {
	server.close()
	console.error(`e2e: FAIL ${message}\ncalls: ${JSON.stringify(calls)}`)
	process.exit(1)
}

let stdout
try {
	;({ stdout } = await promisify(execFile)(process.execPath, [bundle], {
		env: { ...process.env, RPC_URL_MAINNET: rpcUrl },
		timeout: 30_000,
	}))
} catch (error) {
	fail(`bundle exited with an error: ${error.stderr || error.message}`)
}

const call = calls.find((entry) => entry.method === 'eth_call')
if (!call) fail('bundle never sent eth_call')
if (call.params[0].to.toLowerCase() !== addresses[1].toLowerCase()) fail(`eth_call went to ${call.params[0].to}`)
if ((call.params[0].data ?? call.params[0].input) !== expectedData) fail(`unexpected calldata ${call.params[0].data}`)
if (stdout.trim() !== owner) fail(`bundle printed ${JSON.stringify(stdout.trim())}, expected ${owner}`)

server.close()
console.log(`e2e: OK dist/index.js read ownerOf(1) = ${owner} through ${rpcUrl}`)
