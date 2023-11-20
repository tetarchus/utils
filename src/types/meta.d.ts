/** Content for a `script:ld+json` meta tag. */
type LdJsonObject = {
  [Key in string]: LdJsonValue;
} & {
  [Key in string]?: LdJsonValue | undefined;
};

/** Array of LdJson values - including nested. */
type LdJsonArray = LdJsonValue[] | readonly LdJsonValue[];
/** Primitive values available for LdJson content. */
type LdJsonPrimitive = boolean | number | string | null;
/** All types available for LdJson values, allowing for nested arrays and objects. */
type LdJsonValue = LdJsonArray | LdJsonObject | LdJsonPrimitive;

/** Definition of the `<meta charset="utf-8" />` tag. */
interface MetaCharset {
  /** The only valid value for charset in HTML5 is `utf-8`.
   * @see https://developer.mozilla.org/en-US/docs/Web/HTML/Element/meta#:~:text=or%20charset%20attributes.-,charset,-This%20attribute%20declares */
  charSet: 'utf-8';
}

/** Definition of meta tag with `name/content`.
 * @see https://developer.mozilla.org/en-US/docs/Web/HTML/Element/meta/name */
interface MetaDocument {
  /** The name of the property that the content describes. */
  name: string;
  /** The description of the property. */
  content: string;
}

/** Definition of meta tag with `httpEquiv/content`. */
interface MetaHttpEquiv {
  /** Value of the equivalent header. */
  httpEquiv: string;
  /** Content of the equivalent header. */
  content: string;
}

/** Definition of a meta tag with `structured/linked data`.
 * @see https://developers.google.com/search/docs/appearance/structured-data/intro-structured-data */
interface MetaLdJson {
  /** The JSON value of the data for web-crawlers. */
  'script:ld+json': LdJsonObject;
}

/** Definition of meta tag with `property/content`. */
interface MetaProperty {
  /** The name of the property that the content describes. */
  property: string;
  /** The description of the property. */
  content: string;
}

/** Definition of a meta tag accepted by Remix - likely unused by us. */
interface MetaTagName {
  [name: string]: string;
  tagName: 'link' | 'meta';
}

/** Title meta tag. */
interface MetaTitle {
  title: string;
}

/** Any meta tag that may be passed to Remix's meta function. */
type MetaDescriptor =
  | MetaCharset
  | MetaDocument
  | MetaHttpEquiv
  | MetaLdJson
  | MetaProperty
  | MetaTagName
  | MetaTitle
  | Record<string, unknown>;

export type {
  LdJsonObject,
  MetaCharset,
  MetaDescriptor,
  MetaDocument,
  MetaHttpEquiv,
  MetaLdJson,
  MetaProperty,
  MetaTagName,
  MetaTitle,
};
