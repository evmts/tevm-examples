import { describe, expect, it } from 'vitest'
import { getAddress } from 'ethers'
import { addresses } from './addresses'

describe('deployment addresses', () => {
	it('contains valid Ethereum addresses for the configured chains', () => {
		for (const address of Object.values(addresses)) {
			expect(() => getAddress(address)).not.toThrow()
		}
	})
})
