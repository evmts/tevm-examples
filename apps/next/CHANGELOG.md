# @tevm/example-next

## 0.0.2

### Patch Changes

- [#1](https://github.com/evmts/tevm-examples/pull/1) [`1d95fff`](https://github.com/evmts/tevm-examples/commit/1d95fff6a75d15318b4db2af1373617609771bfb) Thanks [@roninjin10](https://github.com/roninjin10)! - Parse array inputs such as `1, 2` as `[1n, 2n]`. Splitting on single commas or spaces produced empty items that `BigInt('')` read as `0n`.

- [`66d9138`](https://github.com/evmts/tevm-examples/commit/66d9138f2dbfe3db42a6f6737e360e2c07b8867c) Thanks [@roninjin10](https://github.com/roninjin10)! - Extract the Tevm examples into a standalone integration workspace that consumes published packages.
