import { expect, test } from 'vitest'
import { readContract } from './readContract'

// This integration test needs a caller-provided fork endpoint; CI has no RPC credentials.
const testWithRpc = process.env.RPC_URL ? test : test.skip

testWithRpc(readContract.name, async () => {
	expect(await readContract()).toBe(BigInt(1))
})
