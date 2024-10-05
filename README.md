# Smooth Tables

[![npm downloads][npm-downloads-src]][npm-downloads-href]
[![License][license-src]][license-href]
[![Nuxt][nuxt-src]][nuxt-href]

Comprehensive and evolving table & data grid module for Nuxt 3+.
Heavily opinionated and made specifically for needs & projects of 3F.

> :warning: Project is under heavy development, expect breaking changes.

- [✨ &nbsp;Release Notes](/CHANGELOG.md)

## Features

- Virtualization
- Filtering
- Custom value & cell formatting (Supports Vue slots)
- Themable
- Supports SSR
- Slick & smooth animations

## Quick Setup

Install the module with your preferred package manager (Bun is recommended):

```bash
bun add smooth-tables
```

Set-up the module in your `nuxt.config.ts`:
```js
// nuxt.config.ts
export default defineNuxtConfig({
  modules: [
    "smooth-tables",
  ],
  smoothTables: {
    // Module options are set here...
  },
});
```

<!-- Badges -->
[npm-downloads-src]: https://img.shields.io/npm/dm/my-module.svg?style=flat&colorA=020420&colorB=00DC82
[npm-downloads-href]: https://npmjs.com/package/smooth-tables

[license-src]: https://img.shields.io/npm/l/my-module.svg?style=flat&colorA=020420&colorB=00DC82
[license-href]: https://npmjs.com/package/smooth-tables

[nuxt-src]: https://img.shields.io/badge/Nuxt-020420?logo=nuxt.js
[nuxt-href]: https://nuxt.com
