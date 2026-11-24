import { bench, describe } from 'vitest'
import { stringify } from './stringify'

// Transaction receipts and logs are rendered with stringify, so measure a
// receipt-sized object with many bigint fields against plain JSON.stringify.
const logs = Array.from({ length: 64 }, (_, i) => ({
	address: '0xFBA3912Ca04dd458c843e2EE08967fC04f3579c2',
	blockNumber: BigInt(19_000_000 + i),
	logIndex: i,
	args: { from: '0x0000000000000000000000000000000000000000', tokenId: BigInt(i) },
}))
const receipt = { gasUsed: BigInt(21_000), status: 'success', logs }
const plain = JSON.parse(stringify(receipt))

describe(stringify.name, () => {
	bench('receipt with 64 bigint logs', () => {
		stringify(receipt)
	})
	bench('JSON.stringify baseline (bigints pre-converted)', () => {
		JSON.stringify(plain)
	})
})
