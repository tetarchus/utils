import { describe, expect, it } from 'vitest';

import { generateInitials, toLowerCase, toUpperCase } from '../../core/string';

describe('String Util Tests', () => {
  describe('Tests for `generateInitials`', () => {
    it('should generate the expected initials for a name', () => {
      expect.assertions(1);
      const name = 'John Smith';
      const result = generateInitials(name);
      expect(result).toStrictEqual('JS');
    });

    it('should generate the capitalized initials regardless of input case', () => {
      expect.assertions(1);
      const name = 'jason van der beek';
      const result = generateInitials(name);
      expect(result).toStrictEqual('JVDB');
    });

    it('should generate the expected initials for words with underscores', () => {
      expect.assertions(1);
      const name = 'John_Smith';
      const result = generateInitials(name);
      expect(result).toStrictEqual('JS');
    });

    it('should return an empty string if input is null/undefined', () => {
      expect.assertions(2);
      const name1 = null;
      const name2 = undefined;
      const result1 = generateInitials(name1);
      const result2 = generateInitials(name2);
      expect(result1).toStrictEqual('');
      expect(result2).toStrictEqual('');
    });
  });

  describe('Tests for `toLowerCase`', () => {
    it('should convert a string to all lower case', () => {
      expect.assertions(1);
      const str = 'THIS_STRING_SHOULD_BECOME_LOWERCASE';
      const result = toLowerCase(str);
      expect(result).toStrictEqual('this_string_should_become_lowercase');
    });
    // TODO: Add more tests
  });

  describe('Tests for `toUpperCase`', () => {
    it('should convert a string to all lower case', () => {
      expect.assertions(1);
      const str = 'this_string_should_become_uppercase';
      const result = toUpperCase(str);
      expect(result).toStrictEqual('THIS_STRING_SHOULD_BECOME_UPPERCASE');
    });
    // TODO: Add more tests
  });
});
