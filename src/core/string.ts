import { snakeCase } from 'lodash-es';

/**
 * Generates initials from given text.
 * @param text The text to generate initials from.
 * @returns Initials generated from the provided text.
 */
const generateInitials = (text: string | null | undefined): string =>
  snakeCase(text ?? '')
    .split('_')
    .map(name => name.at(0)?.toUpperCase())
    .join('');

/**
 * Type-safe version of `String.toUpperCase()` that maintains the type of the input string.
 * @param string The string to convert to uppercase.
 * @returns The string, converted to uppercase.
 */
const toUpperCase = <T extends string>(string: T): Uppercase<T> =>
  string.toUpperCase() as Uppercase<T>;

/**
 * Type-safe version of `String.toLowerCase()` that maintains the type of the input string.
 * @param string The string to convert to uppercase.
 * @returns The string, converted to uppercase.
 */
const toLowerCase = <T extends string>(string: T): Lowercase<T> =>
  string.toLowerCase() as Lowercase<T>;

export { generateInitials, toLowerCase, toUpperCase };
