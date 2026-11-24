import { describe, expect, it } from 'vitest';

import { formatInputValue } from './utils';

describe(formatInputValue.name, () => {
  it('formats Solidity scalar values', () => {
    expect(formatInputValue('uint256', '42')).toBe(BigInt(42));
    expect(formatInputValue('bool', 'true')).toBe(true);
    expect(formatInputValue('bytes32', '0x1234')).toBe('0x1234');
    expect(
      formatInputValue('address', '0x0000000000000000000000000000000000000000'),
    ).toBe('0x0000000000000000000000000000000000000000');
  });

  it('formats comma-separated Solidity arrays', () => {
    expect(formatInputValue('uint256[]', '1,2,3')).toEqual([
      BigInt(1),
      BigInt(2),
      BigInt(3),
    ]);
  });

  it('rejects invalid booleans and bytes', () => {
    expect(() => formatInputValue('bool', 'yes')).toThrow('Invalid boolean');
    expect(() => formatInputValue('bytes', 'not-hex')).toThrow('Invalid bytes');
  });
});

describe(`${formatInputValue.name} array separators`, () => {
  it('treats a comma followed by a space as one separator', () => {
    expect(formatInputValue('uint256[]', '1, 2')).toEqual([BigInt(1), BigInt(2)]);
  });
});
