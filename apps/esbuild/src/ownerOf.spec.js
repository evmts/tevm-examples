import { describe, expect, it } from 'vitest'
import { getAddress } from 'viem'
import { addresses } from './addresses.js'
import { rpcUrls } from './constants.js'
import { mainnet } from 'viem/chains'

// This integration test intentionally runs only with an explicit mainnet RPC endpoint.
const itWithRpc = process.env.RPC_URL_MAINNET ? it : it.skip

describe('ownerOf', () => {
	it('has a valid mainnet deployment and RPC URL', () => {
		expect(getAddress(addresses[mainnet.id])).toBe(addresses[mainnet.id])
		expect(() => new URL(rpcUrls[mainnet.id])).not.toThrow()
	})

	itWithRpc('should work', async () => {
		const { ownerOf } = await import('./ownerOf.js')
		await expect(ownerOf()).resolves.toBe('0x1a1E021A302C237453D3D45c7B82B19cEEB7E2e6')
		await expect(ownerOf(BigInt(420))).resolves.toBe('0xa5cc3c03994DB5b0d9A5eEdD10CabaB0813678AC')
	})
})
