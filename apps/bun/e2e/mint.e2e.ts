// End-to-end test for the bun example. Runs under `bun test` so the
// `bunfig.toml` preload compiles Solidity imports through `@tevm/bun-plugin`.
// It needs no RPC: the contract is deployed into an in-memory Tevm EVM.
import { expect, test } from 'bun:test'
import { createMemoryClient, PREFUNDED_ACCOUNTS } from 'tevm'
import { encodeFunctionData } from 'viem'
import { DeployableExampleContract as ExampleContract } from './DeployableExampleContract.s.sol'

test('compiles ExampleContract.sol, deploys it, and mints a token in memory', async () => {
	const client = createMemoryClient()
	const from = PREFUNDED_ACCOUNTS[0].address

	const deployment = await client.tevmDeploy({ ...ExampleContract.deploy(), from, addToBlockchain: true })
	expect(deployment.errors).toBeUndefined()
	const contract = ExampleContract.withAddress(deployment.createdAddress as `0x${string}`)

	// tevmCall rather than tevmContract: published @tevm/actions <=1.0.0-next.149
	// validates `abi` with an abitype/zod (zod 3) schema inside a zod 4 object
	// and throws "Invalid element at key \"abi\"". Fixed in evmts/tevm source.
	const mint = await client.tevmCall({
		to: contract.address,
		from,
		data: encodeFunctionData(contract.write.mint()),
		addToBlockchain: true,
	})
	expect(mint.errors).toBeUndefined()

	expect(await client.readContract(contract.read.totalSupply())).toBe(BigInt(1))
	expect(await client.readContract(contract.read.ownerOf(BigInt(0)))).toBe(from)
	expect(await client.readContract(contract.read.balanceOf(from))).toBe(BigInt(1))
})
