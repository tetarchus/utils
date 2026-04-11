/** A type that may or may not be an array. */
type Arrayable<T> = T | T[];

/** A type that may or may not need awaiting. */
type Awaitable<T> = T | Promise<T>;

/** A type that may or may not be null/undefined. */
type Nullable<T> = T | null | undefined;

/** Function that can modify an original object and returns the result. */
type ModifyFn<T> = (original: T) => T;

/** Function that can modify an input string array. */
type ModifyNameArrayFn = ModifyFn<string[]>;

/** Object with string keys and unknown values. */
type UnknownRecord = Record<string, unknown>;

/** An object with no keys. */
type EmptyObject = Record<never, never>;

/** Values equivalent to `false` in comparisons. */
type Falsy = null | undefined | false | '' | 0 | 0n;

/** Values equivalent to `true` in comparisons. */
type Truthy<T> = T extends Falsy ? never : T;

export type {
  Arrayable,
  Awaitable,
  EmptyObject,
  Falsy,
  ModifyFn,
  ModifyNameArrayFn,
  Nullable,
  Truthy,
  UnknownRecord,
};
