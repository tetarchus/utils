import { describe, expect, it } from 'vitest';

import {
  cleanObject,
  fromEntries,
  fullClean,
  objectEntries,
  objectKeys,
  swapKeyValue,
} from '../../core/object';

const dirtyObject = {
  string: 'text',
  emptyString: '',
  boolean: true,
  nullable: null,
  number: 42,
  zero: 0,
  undefineable: undefined,
  boolean2: false,
  _private: undefined,
  _secret: 's3cr37',
  _solo: false,
};

const expectedCleanObject = {
  string: 'text',
  emptyString: '',
  boolean: true,
  boolean2: false,
  number: 42,
  zero: 0,
  _secret: 's3cr37',
  _solo: false,
};

const expectedFullCleanObject = {
  boolean: true,
  boolean2: false,
  emptyString: '',
  number: 42,
  string: 'text',
  zero: 0,
};

const stringObject = {
  key: 'value',
  key1: 'value1',
  key2: 'value2',
  key3: 'value3',
  key4: 'value4',
};

const duplicateStringObject = {
  key: 'value',
  key1: 'value1',
  key2: 'value1',
  key3: 'value1',
  key4: 'value1',
};

describe('Column Util Tests', () => {
  describe('Tests for `cleanObject`', () => {
    it('should return an object without any null/undefined values', () => {
      expect.assertions(1);
      const cleanedObject = cleanObject(dirtyObject);
      expect(cleanedObject).toStrictEqual(expectedCleanObject);
    });
  });

  describe('Tests for `fromEntries`', () => {
    it('should create a new object from the given entries', () => {
      expect.assertions(1);
      const entries = [
        ['test', 'test'],
        ['boolean', true],
        ['nullable', null],
      ] as const;
      const expected = { test: 'test', boolean: true, nullable: null };
      const object = fromEntries(entries);
      expect(object).toStrictEqual(expected);
    });
  });

  describe('Tests for `fullClean`', () => {
    it('should return an object without any null/undefined, or private values', () => {
      expect.assertions(1);
      const cleanedObject = fullClean(dirtyObject);
      expect(cleanedObject).toStrictEqual(expectedFullCleanObject);
    });
  });

  describe('Tests for `objectEntries`', () => {
    it('should create an array from the given object', () => {
      expect.assertions(1);
      const entries = [
        ['test', 'test'],
        ['boolean', true],
        ['nullable', null],
      ] as const;
      const object = { test: 'test', boolean: true, nullable: null };
      const array = objectEntries(object);
      expect(array).toStrictEqual(entries);
    });
  });

  describe('Tests for `objectKeys`', () => {
    it('should return an array of all object keys', () => {
      expect.assertions(2);
      const keys = objectKeys(dirtyObject);
      expect(keys).toHaveLength(Object.keys(dirtyObject).length);
      expect(keys).toStrictEqual([
        'string',
        'emptyString',
        'boolean',
        'nullable',
        'number',
        'zero',
        'undefineable',
        'boolean2',
        '_private',
        '_secret',
        '_solo',
      ]);
    });
  });

  describe('Tests for `swapKeyValue`', () => {
    it('should swap keys and values', () => {
      expect.assertions(1);
      const swapped = swapKeyValue(stringObject);
      expect(swapped).toStrictEqual({
        value: 'key',
        value1: 'key1',
        value2: 'key2',
        value3: 'key3',
        value4: 'key4',
      });
    });
    it('should overwrite when there are multiple of the same value', () => {
      expect.assertions(1);
      const swapped = swapKeyValue(duplicateStringObject);
      expect(swapped).toStrictEqual({ value: 'key', value1: 'key4' });
    });
  });
});
