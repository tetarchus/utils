/** A type that may or may not be an array. */
type Arrayable<T> = T | T[];

/** A type that may or may not be null/undefined. */
type Nullable<T> = T | null | undefined;

export type { Arrayable, Nullable };
