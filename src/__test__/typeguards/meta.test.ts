import { describe, expect, it } from 'vitest';

import {
  isCharsetMeta,
  isDocumentMeta,
  isHttpEquivMeta,
  isLdJsonMeta,
  isPropertyMeta,
  isTagNameMeta,
  isTitleMeta,
  isUnknownMeta,
} from '../../typeguards/meta';
import {
  charSet,
  charSetCapitalised,
  charSetInvalid,
  docTag,
  httpEquiv,
  ldJson,
  propertyTag,
  tagArray,
  tagName,
  tagNameInvalid,
  tagNameLink,
  titleTag,
  titleTag2,
} from '../meta';

import type { MetaDescriptor } from '~/types';

describe('Meta Typeguard Tests', () => {
  describe('Tests for `isCharsetMeta`', () => {
    let invalidArray: MetaDescriptor[] = tagArray.filter(
      meta => meta !== charSet && meta !== charSetCapitalised,
    );
    let validArray: MetaDescriptor[] = tagArray.filter(
      meta => meta === charSet || meta === charSetCapitalised,
    );

    it.each(validArray)('should return `true` for valid value %#', meta => {
      expect.assertions(1);
      expect(isCharsetMeta(meta)).toBeTruthy();
    });

    it.each(invalidArray)('should return `false` for invalid value %#', meta => {
      expect.assertions(1);
      expect(isCharsetMeta(meta)).toBeFalsy();
    });
  });

  describe('Tests for `isDocumentMeta`', () => {
    let invalidArray: MetaDescriptor[] = tagArray.filter(meta => meta !== docTag);
    let validArray: MetaDescriptor[] = tagArray.filter(meta => meta === docTag);

    it.each(validArray)('should return `true` for valid value %#', meta => {
      expect.assertions(1);
      expect(isDocumentMeta(meta)).toBeTruthy();
    });

    it.each(invalidArray)('should return `false` for invalid value %#', meta => {
      expect.assertions(1);
      expect(isDocumentMeta(meta)).toBeFalsy();
    });
  });

  describe('Tests for `isHttpEquivMeta`', () => {
    let invalidArray: MetaDescriptor[] = tagArray.filter(meta => meta !== httpEquiv);
    let validArray: MetaDescriptor[] = tagArray.filter(meta => meta === httpEquiv);

    it.each(validArray)('should return `true` for valid value %#', meta => {
      expect.assertions(1);
      expect(isHttpEquivMeta(meta)).toBeTruthy();
    });

    it.each(invalidArray)('should return `false` for invalid value %#', meta => {
      expect.assertions(1);
      expect(isHttpEquivMeta(meta)).toBeFalsy();
    });
  });

  describe('Tests for `isLdJsonMeta`', () => {
    let invalidArray: MetaDescriptor[] = tagArray.filter(meta => meta !== ldJson);
    let validArray: MetaDescriptor[] = tagArray.filter(meta => meta === ldJson);

    it.each(validArray)('should return `true` for valid value %#', meta => {
      expect.assertions(1);
      expect(isLdJsonMeta(meta)).toBeTruthy();
    });

    it.each(invalidArray)('should return `false` for invalid value %#', meta => {
      expect.assertions(1);
      expect(isLdJsonMeta(meta)).toBeFalsy();
    });
  });

  describe('Tests for `isPropertyMeta`', () => {
    let invalidArray: MetaDescriptor[] = tagArray.filter(meta => meta !== propertyTag);
    let validArray: MetaDescriptor[] = tagArray.filter(meta => meta === propertyTag);

    it.each(validArray)('should return `true` for valid value %#', meta => {
      expect.assertions(1);
      expect(isPropertyMeta(meta)).toBeTruthy();
    });

    it.each(invalidArray)('should return `false` for invalid value %#', meta => {
      expect.assertions(1);
      expect(isPropertyMeta(meta)).toBeFalsy();
    });
  });

  describe('Tests for `isTagNameMeta`', () => {
    let invalidArray: MetaDescriptor[] = tagArray.filter(
      meta => meta !== tagName && meta !== tagNameLink,
    );
    let validArray: MetaDescriptor[] = tagArray.filter(
      meta => meta === tagName || meta === tagNameLink,
    );

    it.each(validArray)('should return `true` for valid value %#', meta => {
      expect.assertions(1);
      expect(isTagNameMeta(meta)).toBeTruthy();
    });

    it.each(invalidArray)('should return `false` for invalid value %#', meta => {
      expect.assertions(1);
      expect(isTagNameMeta(meta)).toBeFalsy();
    });
  });

  describe('Tests for `isTitleMeta`', () => {
    let invalidArray: MetaDescriptor[] = tagArray.filter(
      meta => meta !== titleTag && meta !== titleTag2,
    );
    let validArray: MetaDescriptor[] = tagArray.filter(
      meta => meta === titleTag || meta === titleTag2,
    );

    it.each(validArray)('should return `true` for valid value %#', meta => {
      expect.assertions(1);
      expect(isTitleMeta(meta)).toBeTruthy();
    });

    it.each(invalidArray)('should return `false` for invalid value %#', meta => {
      expect.assertions(1);
      expect(isTitleMeta(meta)).toBeFalsy();
    });
  });

  describe('Tests for `isUnknownMeta`', () => {
    let invalidArray: MetaDescriptor[] = tagArray.filter(
      meta => meta !== charSetInvalid && meta !== tagNameInvalid,
    );
    let validArray: MetaDescriptor[] = tagArray.filter(
      meta => meta === charSetInvalid || meta === tagNameInvalid,
    );

    it.each(validArray)('should return `true` for valid value %#', meta => {
      expect.assertions(1);
      expect(isUnknownMeta(meta)).toBeTruthy();
    });

    it.each(invalidArray)('should return `false` for invalid value %#', meta => {
      expect.assertions(1);
      expect(isUnknownMeta(meta)).toBeFalsy();
    });
  });
});
