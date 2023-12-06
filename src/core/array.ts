import type { Truthy } from 'lodash';

/**
 * A more type-aware version of `Array.isArray()` that returns the type of array, rather
 * than `any[]`.
 * @param value A value that may potentially be an array.
 * @returns `true` if `value` is an array, with type narrowing to the array type. `false` if `value`
 * is not an array.
 */
const isArray = <T = unknown>(value: T | T[]): value is T[] => Array.isArray(value);

/**
 * A more type-aware version of `Array.includes()` that allows a wider range of types in the
 * `searchElement` (in the standard version `searchElement` must be the same type as the array)
 * and uses type narrowing of the returned value.
 * @param array The array to check against.
 * @param searchElement The element to search the array for.
 * @param fromIndex The index of the array to search from.
 * @returns A boolean indicating whether the `searchElement` is in the `array`, type narrowed to
 * confirm it is one of the options in the `array`.
 */
const arrayIncludes = <U, T extends U>(
  array: readonly T[],
  searchElement: U,
  fromIndex?: number | undefined,
): searchElement is T => array.includes(searchElement as T, fromIndex);

/**
 * A function intended to be passed to `Array.prototype.filter()`.
 * More type-aware version of passing `Boolean` to `Array.prototype.filter()`. Passing `Boolean`
 * does not allow typescript to infer that the returned array contains the original values with
 * falsy values removed, so will report that the filtered array is still of the input type.
 * @param value The value to check for truthyness.
 * @returns `true` if the value is {@link Truthy}, otherwise `false`.
 */
const filterFalsy = <T>(value: T): value is Truthy<T> => Boolean(value);

/**
 * A function intended to be passed to `Array.prototype.filter()`.
 * Filters out `null`/`undefined` values from the input array, allowing typescript to infer that
 * the returned array does not contain `null`/`undefined` values.
 * @param value The value to check for null/undefined.
 * @returns `true` if the value is not null/undefined, `false` otherwise.
 */
const filterNull = <T>(value: T): value is NonNullable<T> => value != null;

export { arrayIncludes, filterFalsy, filterNull, isArray };
