// import { TITLE_JOIN_CHAR, TITLE_NEW_DIR } from '~/constants';

import { filterFalsy, objectEntries, objectKeys } from '~/core';
import {
  isCharsetMeta,
  isDocumentMeta,
  isHttpEquivMeta,
  isLdJsonMeta,
  isPropertyMeta,
  isTagNameMeta,
  isTitleMeta,
} from '~/typeguards';

import type { MetaFunction } from '@remix-run/node';
import type { MetaDescriptor } from '~/types';

type CombinedLoaderFunction = () => { title: string };

/**
 * Adds a tag to the tagMap array, creating the key and array if not present.
 * @param key The key of the entry in the record to add the item to.
 * @param tag The contents of the tag.
 * @param map The tagMap to add the record/item to.
 * @example addToTagMapArray('title', { title: 'Webpage' }, { title: [{ title: 'Page' }] });
 */
const addToTagMapArray = (
  key: string,
  tag: MetaDescriptor,
  map: Record<string, MetaDescriptor[]>,
): void => {
  if (!Array.isArray(map[key])) map[key] = [];
  map[key]?.push(tag);
};

/**
 * Creates a map of meta tag values. The keys are the significant value (value of the name/property/
 * httpEquiv) in most cases, with some special cases for charSet, title and unknown tags.
 * @param tags Array of meta tags to map.
 * @example
 * mapMetaTags([{ title: 'Page' }, { name: 'author', content: 'tetarchus' }]);
 * @returns A record containing keys of the meta tag's name/property/httpequiv and the tags that
 * relate to that value.
 */
const mapMetaTags = (tags: MetaDescriptor[]): Record<string, MetaDescriptor[]> => {
  const tagMap: Record<string, MetaDescriptor[]> = {};

  for (const tag of tags) {
    if (isDocumentMeta(tag)) {
      addToTagMapArray(tag.name, tag, tagMap);
    } else if (isPropertyMeta(tag)) {
      addToTagMapArray(tag.property, tag, tagMap);
    } else if (isHttpEquivMeta(tag)) {
      addToTagMapArray(tag.httpEquiv, tag, tagMap);
    } else if (isTagNameMeta(tag)) {
      addToTagMapArray(tag.tagName, tag, tagMap);
    } else if (isTitleMeta(tag)) {
      addToTagMapArray('title', tag, tagMap);
    } else if (isLdJsonMeta(tag)) {
      addToTagMapArray('script:ld+json', tag, tagMap);
    } else if (isCharsetMeta(tag) && tagMap['charSet']?.length !== 1) {
      tagMap['charSet'] = [tag];
    } else {
      addToTagMapArray('custom', tag, tagMap);
    }
  }

  return tagMap;
};

/**
 * Creates a custom version of `mergeTitles` with some configuration. The default version is
 * exported as `mergeTitles`, but this can be used to create a custom util in a package.
 * @param param0 Configuration object for setting a custom mergeTitles function.
 * @param param0.titleDir The direction to join titles. `LTR` will have the most recent title on
 * the right, with `RTL` having the most recent title on the left.
 * @param param0.titleJoinChar The character to use when joining titles. This will be placed
 * between each title section without changes, so if spaces are required, they should be included
 * here.
 * @returns A customized function that can be passed in to `mergeMeta`.
 */
const mergeTitlesCustom =
  ({
    titleDir = 'LTR',
    titleJoinChar = ' | ',
  }: {
    titleDir?: 'LTR' | 'RTL';
    titleJoinChar?: string;
  }): MetaFunction<CombinedLoaderFunction, Record<string, CombinedLoaderFunction>> =>
  ({ matches }) => {
    const parentTitles = matches
      // Map all title/title meta entries into a single array
      .flatMap(match => {
        const loaderTitle = (match.data as (typeof match)['data'] | undefined)?.title;
        const metaTitleObject = match.meta.find(meta => isTitleMeta(meta));
        const metaTitle = isTitleMeta(metaTitleObject) && metaTitleObject.title;
        return loaderTitle ?? metaTitle;
      })
      // Remove non-false, non-empty titles
      .filter(filterFalsy);

    // If direction is RTL, the current page title should be on the left - reverse the array
    if (titleDir === 'RTL') parentTitles.reverse();

    return [{ title: parentTitles.join(titleJoinChar) }];
  };

/**
 * Merges all page titles that are part of the current route to make the final title.
 * @param param0 Args passed to remix's Meta functions.
 * @param param0.matches Data from all parts of a nested route.
 * @example mergeTitles(remixData); // => { title: 'Home | The Pirate Code' };
 * @returns The page title, merged from the parts of the route.
 */
const mergeTitles = mergeTitlesCustom({});

/**
 * Custom merge function for metas to allow for overriding some values and appending others to
 * the parent route's values.
 * @see https://gist.github.com/ryanflorence/ec1849c6d690cfbffcb408ecd633e069
 * @param overrideFunction Function that returns meta values to override from parent values.
 * @param appendFunctionn Function that returns meta values to append to parent values.
 * @example
 * import { mergeMeta } from "./merge-meta";
 * const meta = mergeMeta(
 * // These will override the parent meta
 * ({ data }) => [{ title: data.title }];
 * // These will be appended to the parent meta
 * ({ matches }) => [{ name: "author", content: "Tetarchus" }];
 * );
 * @returns All of the meta values for the route.
 */
const mergeMeta =
  (
    overrideFunction: MetaFunction<CombinedLoaderFunction, Record<string, CombinedLoaderFunction>>,
    appendFunction?: MetaFunction<CombinedLoaderFunction, Record<string, CombinedLoaderFunction>>,
  ): MetaFunction<CombinedLoaderFunction, Record<string, CombinedLoaderFunction>> =>
  args => {
    // Get meta from parent routes
    const mergedMeta = args.matches.flatMap(match => match.meta);
    const tagMap = mapMetaTags(mergedMeta);

    // Replace any parent meta with the same name or property with the override
    const overrides = overrideFunction(args);
    for (const override of overrides) {
      const existing = objectKeys(tagMap).find(
        key =>
          (isDocumentMeta(override) && key === override.name) ||
          (isPropertyMeta(override) && key === override.property) ||
          (isHttpEquivMeta(override) && key === override.httpEquiv) ||
          (isTitleMeta(override) && key === 'title'),
      );
      if (existing) {
        tagMap[existing] = [override];
      } else {
        const overrideMeta = mapMetaTags([override]);
        for (const key of objectKeys(overrideMeta)) {
          ({ key: tagMap[key] = [] } = overrideMeta);
        }
      }
    }

    // Append any additional meta
    const appends = appendFunction?.(args);

    return [...objectEntries(tagMap).flatMap(([_key, entry]) => entry), ...(appends ?? [])];
  };

export { addToTagMapArray, mapMetaTags, mergeMeta, mergeTitles, mergeTitlesCustom };
