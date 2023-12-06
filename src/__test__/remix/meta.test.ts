import { describe, expect, it } from 'vitest';

import {
  addToTagMapArray,
  mapMetaTags,
  // mergeMeta,
  // mergeTitles,
  // mergeTitlesCustom,
} from '../../remix/meta';

import {
  baseTagMap,
  charSet,
  docTag,
  ldJson,
  propertyTag,
  tagArray,
  tagName,
  tagNameLink,
  titleTag,
  titleTag2,
} from '../meta';

describe('Remix Meta Util Tests', () => {
  describe('Tests for `addToTagMapArray`', () => {
    it('should add a new array if a key does not exist', () => {
      expect.assertions(4);
      const tagMap = { ...baseTagMap };
      addToTagMapArray('meta', docTag, tagMap);
      expect(Object.keys(tagMap)).toHaveLength(2);
      expect(tagMap).toHaveProperty('meta');
      expect(tagMap['meta']?.length).toBe(1);
      expect(tagMap['meta']).toStrictEqual([docTag]);
    });

    it('should add items to an existing array', () => {
      expect.assertions(3);
      const tagMap = { ...baseTagMap };
      addToTagMapArray('title', titleTag2, tagMap);
      expect(Object.keys(tagMap)).toHaveLength(1);
      expect(tagMap['title']).toHaveLength(2);
      expect(tagMap['title']?.[1]).toStrictEqual(titleTag2);
    });
  });

  describe('Tests for `mapMetaTags`', () => {
    it('should convert an array of tags into a map', () => {
      expect.assertions(15);
      const metaMap = mapMetaTags(tagArray);
      expect(Object.keys(metaMap)).toHaveLength(8);
      expect(metaMap['charSet']).toHaveLength(1);
      expect(metaMap['charSet']?.[0]).toStrictEqual(charSet);
      expect(metaMap['content-type']).toHaveLength(1);
      expect(metaMap['custom']).toHaveLength(2);
      expect(metaMap['description']).toHaveLength(2);
      expect(metaMap['description']?.[0]).toStrictEqual(docTag);
      expect(metaMap['description']?.[1]).toStrictEqual(propertyTag);
      expect(metaMap['link']).toHaveLength(1);
      expect(metaMap['link']).toStrictEqual([tagNameLink]);
      expect(metaMap['meta']).toHaveLength(1);
      expect(metaMap['meta']).toStrictEqual([tagName]);
      expect(metaMap['script:ld+json']).toHaveLength(1);
      expect(metaMap['script:ld+json']?.[0]).toStrictEqual(ldJson);
      expect(metaMap['title']).toHaveLength(2);
    });

    it('should only keep one charSet value', () => {
      expect.assertions(3);
      const arr = [charSet, titleTag, charSet];
      const metaMap = mapMetaTags(arr);
      expect(Object.keys(metaMap)).toHaveLength(2);
      expect(metaMap['charSet']).toHaveLength(1);
      expect(metaMap['charSet']).toStrictEqual([charSet]);
    });
  });

  describe.todo('Tests for `mergeMeta`', () => {
    // TODO: Sort out tests with an example meta
  });

  describe.todo('Tests for `mergeTitles`', () => {});

  describe.todo('Tests for `mergeTitlesCustom`', () => {});
});
