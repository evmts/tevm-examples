---
"@tevm/example-next": patch
---

Parse array inputs such as `1, 2` as `[1n, 2n]`. Splitting on single commas or spaces produced empty items that `BigInt('')` read as `0n`.
