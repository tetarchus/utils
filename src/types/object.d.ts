import type { DeepWritable } from 'ts-essentials';

/** Maps out the types of an object. */
type MergeIntersectingObjects<ObjT> = { [key in keyof ObjT]: ObjT[key] };

/** Generic - Converts the given <UNION_T> Union type to an Intersection. */
type UnionToIntersection<UNION_T> = // From https://stackoverflow.com/a/50375286
  (UNION_T extends unknown ? (k: UNION_T) => void : never) extends (k: infer I) => void ? I : never;

/** Removes all null/undefined values from an object. */
type CleanObject<T> = {
  [P in keyof T]: Exclude<T[P], null | undefined>;
};

/** Type used for fromEntries to convert tuple array to an object. */
type EntriesType = Array<[PropertyKey, unknown]> | ReadonlyArray<readonly [PropertyKey, unknown]>;

/** Converts a tuple array into a Union type. */
type UnionObjectFromArrayOfPairs<ARR_T extends EntriesType> = DeepWritable<ARR_T> extends Array<
  infer R
>
  ? R extends [infer key, infer value]
    ? { [property in key & PropertyKey]: value }
    : never
  : never;

/** Converts Array of tuple key/value pairs to a typed object.  */
type EntriesToObject<ARR_T extends EntriesType> = MergeIntersectingObjects<
  UnionToIntersection<UnionObjectFromArrayOfPairs<ARR_T>>
>;

/** Standard object with unknown key/value types. */
type ObjectType = Record<PropertyKey, unknown>;

/** An entry in the return of `objectEntries`. */
type Entry<T> = { [K in keyof T]: [K, T[K]] }[keyof T];

export type { CleanObject, EntriesToObject, EntriesType, Entry, ObjectType };
