# Table of Contents

The utils in this package are separated into several folders:

- [client](./client/toc.md) - Utils that should only be run on a client. If using a library such as [Remix](https://remix.run/), importing client code on the server can in some cases cause problems. If a function will cause an issue being imported by the server, it will reside here.
- [core](./core/toc.md) - These are the main bulk of the utils. A lot are either common functions that I use, or just more type-aware versions of common vanilla JS functions (I prefer strict typing, which has its own set of problems at times 😅)
- [server](./server/toc.md) - Functions that contain server-side code that won't run in a browser. These are intended to be imported into server files only.
- [typeguards](./typeguards/toc.md) - Typeguards to assist with type-narrowing.
- [types](./types/toc.md) - Types that are used along with the functions in most cases - in some cases there may be types that this package doesn't use directly, but that I end up creating often enough that I've included them here.
