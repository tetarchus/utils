import type {
  MetaCharset,
  MetaDescriptor,
  MetaDocument,
  MetaHttpEquiv,
  MetaLdJson,
  MetaProperty,
  MetaTagName,
  MetaTitle,
} from '~/types';

const ldJsonProperty = 'script:ld+json';

/**
 * Typeguard to check whether a {@link MetaDescriptor} contains a valid `charSet` tag.
 * @param meta The meta descriptor to check.
 * @returns `true` if the `meta` contains a valid {@link MetaCharset} tag.
 */
const isCharsetMeta = (meta: MetaDescriptor | undefined): meta is MetaCharset =>
  meta != null &&
  'charSet' in meta &&
  typeof meta.charSet === 'string' &&
  meta.charSet.toLowerCase() === 'utf-8';

/**
 * Typeguard to check whether a {@link MetaDescriptor} contains a 'document'
 * tag with `name` and `content` properties.
 * @param meta The meta descriptor to check.
 * @returns `true` if the `meta` contains a valid {@link MetaDocument} tag.
 */
const isDocumentMeta = (meta: MetaDescriptor | undefined): meta is MetaDocument =>
  meta != null &&
  'name' in meta &&
  typeof meta.name === 'string' &&
  'content' in meta &&
  typeof meta.content === 'string';

/**
 * Typeguard to check whether a {@link MetaDescriptor} contains an 'httpEquiv'
 * tag with `httpEquiv` and `content` properties.
 * @param meta The meta descriptor to check.
 * @returns `true` if the `meta` contains a valid {@link MetaHttpEquiv} tag.
 */
const isHttpEquivMeta = (meta: MetaDescriptor | undefined): meta is MetaHttpEquiv =>
  meta != null &&
  'httpEquiv' in meta &&
  typeof meta.httpEquiv === 'string' &&
  'content' in meta &&
  typeof meta.content === 'string';

/**
 * Typeguard to check whether a {@link MetaDescriptor} contains a valid `LD+JSON tag.
 * @param meta The meta descriptor to check.
 * @returns `true` if the `meta` contains a valid {@link MetaLdJson} tag.
 */
const isLdJsonMeta = (meta: MetaDescriptor | undefined): meta is MetaLdJson =>
  meta != null && ldJsonProperty in meta && typeof meta[ldJsonProperty] === 'object';

/**
 * Typeguard to check whether a {@link MetaDescriptor} contains a valid 'property' tag with
 * `property` and `content` properties.
 * @param meta The meta descriptor to check.
 * @returns `true` if the `meta` contains a valid {@link MetaProperty} tag.
 */
const isPropertyMeta = (meta: MetaDescriptor | undefined): meta is MetaProperty =>
  meta != null &&
  'property' in meta &&
  typeof meta.property === 'string' &&
  'content' in meta &&
  typeof meta.content === 'string';

/**
 * Typeguard to check whether a {@link MetaDescriptor} contains a valid 'tagName' tag.
 * @param meta The meta descriptor to check.
 * @returns `true` if the `meta` contains a valid {@link MetaTagName} tag.
 */
const isTagNameMeta = (meta: MetaDescriptor | undefined): meta is MetaTagName =>
  meta != null &&
  'tagName' in meta &&
  typeof meta.tagName === 'string' &&
  (meta.tagName === 'meta' || meta.tagName === 'link');

/**
 * Typeguard to check whether a {@link MetaDescriptor} contains a valid 'title' tag.
 * @param meta The meta descriptor to check.
 * @returns `true` if the `meta` contains a valid {@link MetaTitle} tag.
 */
const isTitleMeta = (meta: MetaDescriptor | undefined): meta is MetaTitle =>
  meta != null && 'title' in meta && typeof meta.title === 'string';

/**
 * Typeguard to check whether a {@link MetaDescriptor} contains any tag not already covered, in
 * which case it could be a custom tag.
 * @param meta The meta descriptor to check.
 * @returns `true` if the `meta` contains any content other than the other types already
 * covered above.
 */
const isUnknownMeta = (meta: MetaDescriptor | undefined): meta is Record<string, unknown> =>
  meta != null &&
  !isCharsetMeta(meta) &&
  !isTitleMeta(meta) &&
  !isHttpEquivMeta(meta) &&
  !isPropertyMeta(meta) &&
  !isDocumentMeta(meta) &&
  !isLdJsonMeta(meta) &&
  !isTagNameMeta(meta);

export {
  isCharsetMeta,
  isDocumentMeta,
  isHttpEquivMeta,
  isLdJsonMeta,
  isPropertyMeta,
  isTagNameMeta,
  isTitleMeta,
  isUnknownMeta,
  ldJsonProperty,
};
