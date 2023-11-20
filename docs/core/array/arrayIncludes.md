# Array Includes

A type-aware version of `Array.prototype.includes()`.

## The Problem

The default type of `Array.prototype.includes()` is:

```ts
// `T` is inferred from the input array, and `searchElement` is expected to be the same type.
Array<T>.includes(searchElement: T, fromIndex?: number | undefined): boolean
```

This is fine for widely-typed arrays:

```ts
// `T` is `string` and both the input array, and the `searchElement` are of `string` type
['standard', 'string', 'array'].includes('not-in-array');
```

But as `T` is inferred from the input array, and `searchElement` is expected to be the same type, this means that if you have a narrow-typed array, and are trying to check if a wider-typed `searchElement` is included, it will show a `typescript` error:

```ts
(['narrow', 'typed', 'array'] as const).includes('not');
// ts(2345): Argument of type '"not"' is not assignable to parameter of type '"narrow" | "typed" | '"array"'
```

Most of the time, you want to be able to check whether the `searchElement` is in the array as it _could_ be one of those values.

## Solution

`arrayIncludes` typing is:

```ts
type ArrayIncludes = <U, T extends U>(
  array: readonly T[],
  searchElement: U,
  fromIndex?: number | undefined,
): searchElement is T
```

So rather than the `searchElement` and the `array` needing to be the exact same type, `searchElement` is able to be a wider-type than `array`, allowing for the below not to raise any issues, (and narrow the type of `searchElement` in following code).

```ts
const array = ['narrow', 'typed', 'array'] as const;
const searchElement = 'not';
if (arrayIncludes(array, searchElement)) {
  // No error - `searchElement` here is of type '"narrow" | "typed" | '"array"'
  // ...
}
```

## Limitations

Currently this function expects all of the input array to `extend` the same type (all be a subset of `string` | `number`, rather than a mix). I usually use this to check whether `searchElement` is part of an enumerated value list, so this is fine, but this may be broadened in future.