import { mainnet } from 'viem/chains'
import { z } from 'zod'

/**
 * RPC endpoints keyed by chain id.
 *
 * Validated at module load rather than at first request, so a malformed
 * `RPC_URL_MAINNET` fails immediately with a readable error instead of surfacing as a
 * network failure deep inside a contract call.
 *
 * @throws {import('zod').ZodError} If `RPC_URL_MAINNET` is set but is not a valid URL.
 * @example
 * ```js
 * import { mainnet } from 'viem/chains'
 * import { rpcUrls } from './constants.js'
 *
 * console.log(rpcUrls[mainnet.id])
 * ```
 */
export const rpcUrls = {
	1: z.string().url().optional().default(mainnet.rpcUrls.default.http[0]).parse(process.env.RPC_URL_MAINNET),
}
