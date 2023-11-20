# Filter Falsy

A type-narrowing array filter function that filters out falsy values.

## The Problem

Sometimes you have an array of values that may contain narrow typings (through `const`, or `typescript` inferring narrower types due to enumerated values). The standard method of stripping out undesired falsy values is passing the `Boolean` constructor to the `Array.prototype.filter()` function.

This _works_ fine, and does what it's meant to, but `typescript` still _thinks_ that the array _could_ contain those values, because the `Boolean` constructor just returns `true`/`false` with no contextual awareness:

```ts
const filtered = (['value', 'value2', false, ''] as const).filter(Boolean);
// `filtered` type: (false | "" | "value" | "value2")[] (exactly the same as the input)
```

## The Solution

`filterFalsy` is essentially a wrapper _around_ passing in just the `Boolean` constructor, but with a `typeguard` style return value, so that typescript can infer the correct types:

```ts
type FilterFalsy = <T>(value: T): value is Truthy<T>
const filtered = (['value', 'value2', false, ''] as const).filter(filterFalsy);
// `filtered` type: ('value' | 'value2)[]
```
