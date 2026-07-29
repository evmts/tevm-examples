import { ERC20 } from 'tevm/contract'
import { http } from '@tevm/jsonrpc'
import { createMemoryClient } from 'tevm/memory-client'
import type { Address } from 'viem'

// Default values that can be overridden
const defaultAddress = '0x0000000000000000000000000000000000000000'
const defaultAccount = '0x0000000000000000000000000000000000000000'
const defaultRpcUrl = 'http://localhost:8545'

/**
 * A Tevm memory client forked from `process.env.RPC_URL`, falling back to a local
 * node at `http://localhost:8545`.
 *
 * State is fetched lazily from the fork transport, so reads resolve against real
 * chain state without syncing a node.
 *
 * @example
 * ```ts
 * import { client } from './readContract.js'
 *
 * const blockNumber = await client.getBlockNumber()
 * ```
 */
export const client = createMemoryClient({
	fork: {
		transport: http(process.env.RPC_URL || defaultRpcUrl),
	},
})

/**
 * Options accepted by {@link readContract}. Every field is optional; the defaults
 * read `balanceOf(0x0…0)` on the zero address using the built-in ERC20 ABI.
 */
type ReadContractOptions = {
	/** Contract address to read from. Defaults to the zero address. */
	address?: Address
	/** Account passed as the `balanceOf` argument. Defaults to the zero address. */
	account?: Address
	/** ABI to decode against. Defaults to the ERC20 ABI shipped with `tevm/contract`. */
	abi?: typeof ERC20.abi
	/** Function to call. Only `balanceOf` is supported by this example. */
	functionName?: 'balanceOf'
}

/**
 * Reads an ERC20 balance through the forked Tevm memory {@link client}.
 *
 * @param options - See {@link ReadContractOptions}. Defaults to `balanceOf` on the zero address.
 * @returns The decoded balance as a `bigint`.
 * @throws If the fork transport is unreachable, or if the address does not expose an
 *   ERC20-compatible `balanceOf` (the call reverts and viem throws a `ContractFunctionExecutionError`).
 * @example
 * ```ts
 * import { readContract } from './readContract.js'
 *
 * const balance = await readContract({
 *   address: '0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48',
 *   account: '0x55FE002aefF02F77364de339a1292923A15844B8',
 * })
 * console.log(balance) // 1234567890n
 * ```
 */
export const readContract = async ({
	address = defaultAddress,
	account = defaultAccount,
	abi = ERC20.abi,
	functionName = 'balanceOf',
}: ReadContractOptions = {}) => {
	return client.readContract({
		address,
		abi,
		functionName,
		args: [account],
	})
}

// Execute if run directly
if (import.meta.main) {
	readContract()
		.then((result) => console.log(JSON.stringify(result, null, 2)))
		.catch((error) => console.error('Error:', error))
}
