import fc from 'fast-check'
import { describe, expect, it } from 'vitest'
import { stringify } from './stringify'

// Deterministic by default; override with FUZZ_SEED / FUZZ_RUNS to explore.
const params = {
	seed: Number(process.env.FUZZ_SEED ?? 20261124),
	numRuns: Number(process.env.FUZZ_RUNS ?? 500),
}

// Replace every bigint with its decimal string, which is what stringify promises.
const expected = (value: unknown): unknown => {
	if (typeof value === 'bigint') return value.toString()
	if (Array.isArray(value)) return value.map(expected)
	if (value && typeof value === 'object') {
		return Object.fromEntries(Object.entries(value).map(([key, inner]) => [key, expected(inner)]))
	}
	return value
}

const jsonWithBigints = fc.letrec((tie) => ({
	value: fc.oneof(
		{ depthSize: 'small' },
		fc.bigInt(),
		fc.integer(),
		fc.string(),
		fc.boolean(),
		fc.constant(null),
		fc.array(tie('value'), { maxLength: 4 }),
		fc.dictionary(fc.string(), tie('value'), { maxKeys: 4 }),
	),
})).value

describe(`${stringify.name} (fuzz)`, () => {
	it('never throws on bigints and encodes them as decimal strings', () => {
		fc.assert(
			fc.property(jsonWithBigints, (value) => {
				expect(JSON.parse(stringify(value))).toEqual(expected(value))
			}),
			params,
		)
	})

	it('matches JSON.stringify for bigint-free values, including indentation', () => {
		fc.assert(
			fc.property(fc.jsonValue(), fc.integer({ min: 0, max: 4 }), (value, space) => {
				expect(stringify(value, null, space)).toBe(JSON.stringify(value, null, space))
			}),
			params,
		)
	})
})
