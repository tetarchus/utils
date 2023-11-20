# Filter Null

A type-narrowing array filter function that filters out `null`/`undefined` values.

## The Problem

Similar to [filterFalsy]('./filterFalsy.md'), this function simply removes `null`/`undefined` values from an array, and allows typescript to correctly infer the returned array type.

Passing in a basic filter function to remove `null`/`undefined` values, doesn't _actually_ let `typescript` infer the correct returned array type.

```ts
const filtered = ([null, undefined, 'string', 'string2'] as const).filter(val => val != null);
// `filtered` type: ("string" | "string2" | null | undefined)[](exactly the same as the input)
```


## The Solution

`filterNull` has a `typeguard` style return value, so that typescript can infer the correct types:

```ts
type FilterFalsy = <T>(value: T): value is NonNullable<T>
const filtered = ([null, undefined, 'string', 'string2'] as const).filter(filterFalsy);
// `filtered` type: ('string' | 'string2)[]
```
