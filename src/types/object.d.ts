// import type { DeepWritable } from 'ts-essentials';

type DeepWritable<OBJ_T> = { -readonly [P in keyof OBJ_T]: DeepWritable<OBJ_T[P]> };

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
type UnionObjectFromArrayOfPairs<ARR_T extends EntriesType> =
  DeepWritable<ARR_T> extends (infer R)[]
    ? R extends [infer key, infer val]
      ? { [prop in key & PropertyKey]: val }
      : never
    : never;

/** Converts Array of tuple key/value pairs to a typed object.  */
type EntriesToObject<ARR_T extends EntriesType> = MergeIntersectingObjects<
  UnionToIntersection<UnionObjectFromArrayOfPairs<ARR_T>>
>;

/** Standard object with unknown key/value types. */
type ObjectType = Record<PropertyKey, unknown>;

export type { CleanObject, EntriesToObject, EntriesType, ObjectType };
