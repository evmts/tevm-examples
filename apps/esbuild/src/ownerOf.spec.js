import { describe, expect, it } from 'vitest'

// This integration test intentionally runs only with an explicit mainnet RPC endpoint.
const itWithRpc = process.env.RPC_URL_MAINNET ? it : it.skip

describe('ownerOf', () => {
	itWithRpc('should work', async () => {
		const { ownerOf } = await import('./ownerOf.js')
		await expect(ownerOf()).resolves.toBe('0x1a1E021A302C237453D3D45c7B82B19cEEB7E2e6')
		await expect(ownerOf(BigInt(420))).resolves.toBe('0xa5cc3c03994DB5b0d9A5eEdD10CabaB0813678AC')
	})
})
