import { describe, expect, it } from 'vitest';

import { arrayIncludes, filterFalsy, filterNull, isArray } from '../../core/array';

// Falsy values from https://developer.mozilla.org/en-US/docs/Glossary/Falsy
const falsyValues = [false, NaN, 0x0, 0.0, -0, -0x0, 0n, ''];
const truthyValues = [true, 1, -123, 5, 'string', {}, [], { test: 'object' }, ['nested', 'array']];
const arrayToFilter = [null, undefined, ...falsyValues, ...truthyValues];
const expectedNullResult = [...falsyValues, ...truthyValues];

describe('Array Util Tests', () => {
  describe('Tests for `arrayIncludes`', () => {
    it('should return `true` when the value is included in the array', () => {
      expect.assertions(1);
      const result = arrayIncludes(['test', 'values'], 'test');
      expect(result).toBeTruthy();
    });

    it('should return `false` when the value is not included in the array', () => {
      expect.assertions(1);
      const result = arrayIncludes(['test', 'values'], 'new');
      expect(result).toBeFalsy();
    });
  });

  describe('Tests for `filterFalsy`', () => {
    it('should remove all falsy values from an array', () => {
      expect.assertions(1);
      const result = [...arrayToFilter].filter(filterFalsy);
      expect(result).toStrictEqual(truthyValues);
    });
  });

  describe('Tests for `filterNull`', () => {
    it('should remove null/undefined values from an array', () => {
      expect.assertions(1);
      const result = [...arrayToFilter].filter(filterNull);
      expect(result).toStrictEqual(expectedNullResult);
    });
  });

  describe('Tests for `isArray`', () => {
    it('should return `true` when the value is an array', () => {
      expect.assertions(1);
      const result = isArray([...arrayToFilter]);
      expect(result).toBeTruthy();
    });

    it('should return `false` when the value is not an array', () => {
      expect.assertions(1);
      const result = isArray('thisShouldFail');
      expect(result).toBeFalsy();
    });
  });
});
