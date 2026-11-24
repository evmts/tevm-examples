import fc from 'fast-check';
import { describe, expect, it } from 'vitest';

import { formatInputValue } from './utils';

// Deterministic by default; override with FUZZ_SEED / FUZZ_RUNS to explore.
const params = {
  seed: Number(process.env.FUZZ_SEED ?? 20261124),
  numRuns: Number(process.env.FUZZ_RUNS ?? 500),
};

const uint256 = fc.bigInt({ min: BigInt(0), max: (BigInt(1) << BigInt(256)) - BigInt(1) });
const separator = fc.constantFrom(',', ' ', ', ', ' ,', '  ', ',  ');

describe(`${formatInputValue.name} (fuzz)`, () => {
  it('round-trips any uint256 written in decimal', () => {
    fc.assert(
      fc.property(uint256, (value) => {
        expect(formatInputValue('uint256', value.toString())).toBe(value);
      }),
      params,
    );
  });

  it('parses uint arrays joined by any mix of commas and spaces', () => {
    fc.assert(
      fc.property(fc.array(uint256, { minLength: 1, maxLength: 8 }), separator, (values, sep) => {
        expect(formatInputValue('uint256[]', values.join(sep))).toEqual(values);
      }),
      params,
    );
  });

  it('accepts every even-length hex string as bytes and returns it unchanged', () => {
    fc.assert(
      fc.property(fc.uint8Array({ maxLength: 64 }), (bytes) => {
        const hex = `0x${Buffer.from(bytes).toString('hex')}`;
        expect(formatInputValue('bytes', hex)).toBe(hex);
      }),
      params,
    );
  });

  it('rejects any boolean spelling other than true/false/1/0', () => {
    fc.assert(
      fc.property(
        fc.string().filter((s) => !['true', 'false', '1', '0'].includes(s)),
        (value) => {
          expect(() => formatInputValue('bool', value)).toThrow('Invalid boolean');
        },
      ),
      params,
    );
  });
});
