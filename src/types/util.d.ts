/** A type that may or may not be an array. */
type Arrayable<T> = T | T[];

/** A type that may or may not need awaiting. */
type Awaitable<T> = T | Promise<T>;

/** A type that may or may not be null/undefined. */
type Nullable<T> = T | null | undefined;

export type { Arrayable, Awaitable, Nullable };
