import { ERC20 } from 'tevm/contract'
import { expect, test } from 'vitest'
import { readContract } from './readContract'

test('uses the ERC20 ABI exported by the published tevm package', () => {
	expect(ERC20.abi.some((item) => item.type === 'function' && item.name === 'balanceOf')).toBe(true)
})

// This integration test needs a caller-provided fork endpoint; CI has no RPC credentials.
const testWithRpc = process.env.RPC_URL ? test : test.skip

testWithRpc(readContract.name, async () => {
	expect(await readContract()).toBe(BigInt(1))
})
