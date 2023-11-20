import { isNil, omitBy } from 'lodash-es';

import type { CleanObject, EntriesToObject, EntriesType, ObjectType } from '~/types';

type ValidKey = number | string;

/**
 * A version of `Object.keys()` that is able to preserve the keys for `interface`s and `type`s.
 * @param object The object to get keys for.
 * @returns A typed array of keys for the object.
 */
const objectKeys = <T extends object>(object: T): Array<keyof T> =>
  Object.keys(object) as Array<keyof T>;

/**
 * A version of `Object.entries()` that is able to preserve the value types for `interface`s
 * and `type`s.
 * @param object The object to get entries for.
 * @returns A typed array of entries (key/value paired tuple) for the object.
 */
const objectEntries = <
  O extends object,
  K = keyof O,
  V = O extends Record<string, infer L> ? L : never,
>(
  object: O,
): Array<[K, V]> => Object.entries(object) as unknown as Array<[K, V]>;

/**
 * A version of `Object.fromEntries()` that is able to preserve the types passed in and create an
 * object containing the key/value types of the tuples it was made from.
 * @param entries An array of key/value tuples to convert into an object.
 * @returns A typed array of keys for the object.
 */
const fromEntries = <ARR_T extends EntriesType>(entries: ARR_T): EntriesToObject<ARR_T> =>
  Object.fromEntries(entries) as EntriesToObject<ARR_T>;

/**
 * Strips out all null/undefined values from an object.
 * @param object The object to clean.
 * @returns An object with all null/undefined properties stripped out.
 */
const cleanObject = <OBJ_T extends ObjectType>(object: OBJ_T): CleanObject<OBJ_T> =>
  omitBy(object, isNil) as CleanObject<OBJ_T>;

/**
 * Strips out all null/undefined values from an object, as well as removing inferred private
 * properties (those starting with an `_`).
 * @param object The object to clean.
 * @returns An object with all null/undefined and private properties stripped out.
 */
const fullClean = <OBJ_T extends ObjectType>(object: OBJ_T): CleanObject<OBJ_T> =>
  omitBy(cleanObject(object), (_value, key) => key.startsWith('_')) as CleanObject<OBJ_T>;

/**
 * Reverses the key/values of an object, turning the keys into values, and the values into keys.
 * @param object The object to swap values for.
 * @returns The reversed object.
 */
const swapKeyValue = <K extends ValidKey, V extends ValidKey>(object: Record<K, V>): Record<V, K> =>
  Object.fromEntries(Object.entries(object).map(([key, value]) => [value, key]));

export { cleanObject, fromEntries, fullClean, objectEntries, objectKeys, swapKeyValue };
