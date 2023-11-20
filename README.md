# @tetarchus/utils

> A collection of type-aware utility functions to share between projects (and possibly assist others).

I use Typescript quite heavily, and whilst the built-in types for functions are often useful, they can at times be lacking.

I found myself creating or borrowing utility functions that maintain strict typings, and then copying them between projects, so I've bundled them up to prevent having to copy them around my projects, and perhaps you'll find them helpful too!

These functions may be improved/updated over time so that I don't have to take learnings from one project and back-fill them as well.

## Install

```sh
npm i @tetarchus/utils
```

## Usage

```ts
import {filterFalsy} from '@tetarchus/utils';

const array.filter(filterFalsy);
```

## Included Functions

### Array

- [arrayIncludes](./docs/array/arrayIncludes.md) - A more type-aware version of `Array.prototype.includes()`