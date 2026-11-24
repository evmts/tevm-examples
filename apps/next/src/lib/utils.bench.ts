import { bench, describe } from 'vitest';

import { formatInputValue } from './utils';

// Inputs come from form fields on every keystroke, so parsing must stay cheap.
const largeUint = ((BigInt(1) << BigInt(256)) - BigInt(1)).toString();
const uintList = Array.from({ length: 256 }, (_, i) => i * 1_000_003).join(', ');
const address = '0xd8dA6BF26964aF9D7eEd9e03E53415D37aA96045';

describe(formatInputValue.name, () => {
  bench('uint256 scalar', () => {
    formatInputValue('uint256', largeUint);
  });
  bench('uint256[256] list', () => {
    formatInputValue('uint256[]', uintList);
  });
  bench('checksummed address', () => {
    formatInputValue('address', address.toLowerCase());
  });
});
