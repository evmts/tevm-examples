import { http, createPublicClient } from 'viem'
import { mainnet } from 'viem/chains'
import { ExampleContract } from './ExampleContract.sol'
import { addresses } from './addresses.js'
import { rpcUrls } from './constants.js'

/**
 * A viem public client pointed at Ethereum mainnet via {@link rpcUrls}.
 *
 * @example
 * ```js
 * import { publicClient } from './ownerOf.js'
 *
 * const blockNumber = await publicClient.getBlockNumber()
 * ```
 */
export const publicClient = createPublicClient({
	chain: mainnet,
	transport: http(rpcUrls[mainnet.id]),
})

/**
 * Reads `ownerOf(tokenId)` on the mainnet deployment of `ExampleContract`.
 *
 * The ABI, function name, and argument types all come from the Solidity import,
 * so renaming the function in `ExampleContract.sol` breaks this call at build time.
 *
 * @param {bigint} [tokenId] - Token id to look up. Defaults to `1n`.
 * @returns {Promise<`0x${string}`>} The owner address.
 * @throws If `RPC_URL_MAINNET` points at an unreachable endpoint, or if the token does
 *   not exist — ERC721 `ownerOf` reverts and viem throws a `ContractFunctionExecutionError`.
 * @example
 * ```js
 * import { ownerOf } from './ownerOf.js'
 *
 * console.log(await ownerOf())            // owner of token 1
 * console.log(await ownerOf(BigInt(420))) // owner of token 420
 * ```
 */
export const ownerOf = (tokenId = BigInt(1)) => {
	return publicClient.readContract({
		...ExampleContract.read.ownerOf(tokenId),
		address: addresses[1],
	})
}
