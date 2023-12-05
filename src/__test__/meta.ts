import type { MetaDescriptor } from '~/types';

const titleTag: MetaDescriptor = { title: '@tetarchus/utils' };
const titleTag2: MetaDescriptor = { title: 'Extra Title' };
const docTag: MetaDescriptor = { name: 'description', content: 'This is a new tag' };
const propertyTag: MetaDescriptor = { property: 'description', content: 'This should stack' };
const httpEquiv: MetaDescriptor = { httpEquiv: 'content-type', content: 'application/json' };
const tagName: MetaDescriptor = { tagName: 'meta' };
const tagNameLink: MetaDescriptor = { tagName: 'link' };
const tagNameInvalid: MetaDescriptor = { tagName: 'invalid' };
const ldJson: MetaDescriptor = {
  'script:ld+json': {
    '@context': 'http://schema.org/',
    '@type': 'Review',
    'itemReviewed': {
      '@type': 'Thing',
      'name': 'Name',
    },
    'reviewRating': {
      '@type': 'Rating',
      'ratingValue': '3',
      'bestRating': '5',
    },
    'publisher': {
      '@type': 'Organization',
      'name': '1234',
    },
  },
};
const charSet: MetaDescriptor = { charSet: 'utf-8' };
const charSetCapitalised: MetaDescriptor = { charSet: 'UTF-8' };
const charSetInvalid: MetaDescriptor = { charSet: 'iso' };
const baseTagMap: Record<string, MetaDescriptor[]> = { title: [titleTag] };
const tagArray: MetaDescriptor[] = [
  charSet,
  charSetCapitalised,
  charSetInvalid,
  docTag,
  httpEquiv,
  ldJson,
  propertyTag,
  tagName,
  tagNameLink,
  tagNameInvalid,
  titleTag,
  titleTag2,
];

export {
  baseTagMap,
  charSet,
  charSetCapitalised,
  charSetInvalid,
  docTag,
  httpEquiv,
  ldJson,
  propertyTag,
  tagArray,
  tagName,
  tagNameLink,
  tagNameInvalid,
  titleTag,
  titleTag2,
};
