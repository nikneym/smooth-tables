# Changelog


## v0.0.6

[compare changes](https://github.com/nikneym/smooth-tables/compare/v0.0.5...v0.0.6)

### 🩹 Fixes

- Recompute virtual rows when columns change(?) ([f688e44](https://github.com/nikneym/smooth-tables/commit/f688e44))

### 🏡 Chore

- **release:** V0.0.5 ([6a2a0af](https://github.com/nikneym/smooth-tables/commit/6a2a0af))
- Update dependencies ([e99a920](https://github.com/nikneym/smooth-tables/commit/e99a920))

### ❤️ Contributors

- Nikneym ([@nikneym](http://github.com/nikneym))

## v0.0.5

[compare changes](https://github.com/nikneym/smooth-tables/compare/v0.0.4...v0.0.5)

### 🚀 Enhancements

- **actions:** Introduce row actions + dropdown action ([739b383](https://github.com/nikneym/smooth-tables/commit/739b383))
- Implement action callbacks ([c0bf951](https://github.com/nikneym/smooth-tables/commit/c0bf951))
- **ActionDropdown:** A11y improvements ([0f9f7ff](https://github.com/nikneym/smooth-tables/commit/0f9f7ff))

### 🩹 Fixes

- Scroll the table header when the body is scrolled horizontally ([e537a70](https://github.com/nikneym/smooth-tables/commit/e537a70))
- **ColumnSearch:** Hydration error ([1896ea4](https://github.com/nikneym/smooth-tables/commit/1896ea4))

### 💅 Refactors

- Prefer `provide` for sharing scroll state to descendants ([043fb81](https://github.com/nikneym/smooth-tables/commit/043fb81))
- **ActionMenu:** Rename component ([0c3a16d](https://github.com/nikneym/smooth-tables/commit/0c3a16d))

### 🏡 Chore

- **release:** V0.0.4 ([2561e65](https://github.com/nikneym/smooth-tables/commit/2561e65))
- Playground changes ([a35f5a5](https://github.com/nikneym/smooth-tables/commit/a35f5a5))
- Add @floating-ui/vue dependency ([10a616e](https://github.com/nikneym/smooth-tables/commit/10a616e))
- Playground changes ([1b8f8c0](https://github.com/nikneym/smooth-tables/commit/1b8f8c0))
- Playground changes ([bd4eeb3](https://github.com/nikneym/smooth-tables/commit/bd4eeb3))

### ❤️ Contributors

- Nikneym ([@nikneym](http://github.com/nikneym))

## v0.0.4

[compare changes](https://github.com/nikneym/smooth-tables/compare/v0.0.3...v0.0.4)

### 💅 Refactors

- Allow overflowing horizontally in table body ([cdc32fb](https://github.com/nikneym/smooth-tables/commit/cdc32fb))

### 🏡 Chore

- **release:** V0.0.3 ([e8b6c6c](https://github.com/nikneym/smooth-tables/commit/e8b6c6c))

### ❤️ Contributors

- Nikneym ([@nikneym](http://github.com/nikneym))

## v0.0.3

[compare changes](https://github.com/nikneym/smooth-tables/compare/v0.0.2...v0.0.3)

### 🚀 Enhancements

- Accept status as prop ([51194d3](https://github.com/nikneym/smooth-tables/commit/51194d3))

### 🩹 Fixes

- Flexbox bug that caused header layout to break ([0927d5b](https://github.com/nikneym/smooth-tables/commit/0927d5b))

### 💅 Refactors

- Check if elements exist in composables ([c349a10](https://github.com/nikneym/smooth-tables/commit/c349a10))
- Remove unnecessary z-index ([2d7823e](https://github.com/nikneym/smooth-tables/commit/2d7823e))

### 🏡 Chore

- **release:** V0.0.2 ([dfcfc7c](https://github.com/nikneym/smooth-tables/commit/dfcfc7c))
- Update README ([e8b57fc](https://github.com/nikneym/smooth-tables/commit/e8b57fc))
- Playground changes ([fba4302](https://github.com/nikneym/smooth-tables/commit/fba4302))

### ❤️ Contributors

- Nikneym ([@nikneym](http://github.com/nikneym))

## v0.0.2

[compare changes](https://github.com/nikneym/smooth-tables/compare/v0.0.1...v0.0.2)

### 🏡 Chore

- **release:** V0.0.1 ([542cf3d](https://github.com/nikneym/smooth-tables/commit/542cf3d))
- Move table types out of component ([0248b61](https://github.com/nikneym/smooth-tables/commit/0248b61))

### ❤️ Contributors

- Nikneym ([@nikneym](http://github.com/nikneym))

## v0.0.1


### 🚀 Enhancements

- Unified `useFilter` API ([8dd29ea](https://github.com/nikneym/smooth-tables/commit/8dd29ea))
- Prefer `shallowReactive` in `useFilter` ([a64d233](https://github.com/nikneym/smooth-tables/commit/a64d233))
- Initial `Select` component implementation ([004a4a7](https://github.com/nikneym/smooth-tables/commit/004a4a7))
- Various style changes ([7a24e08](https://github.com/nikneym/smooth-tables/commit/7a24e08))
- **wip:** Row caching rewrite ([38943c8](https://github.com/nikneym/smooth-tables/commit/38943c8))
- A11y changes to `Search` component ([f3411d3](https://github.com/nikneym/smooth-tables/commit/f3411d3))

### 🩹 Fixes

- Filtering on init via `initialQuery` now possible ([d969abe](https://github.com/nikneym/smooth-tables/commit/d969abe))
- **useIsScrolling:** Remove scroll event on unmount ([6a3e663](https://github.com/nikneym/smooth-tables/commit/6a3e663))
- Glutter layout caused by scrollbar on Chrome ([f52b80b](https://github.com/nikneym/smooth-tables/commit/f52b80b))
- Import components needed by table locally ([325fa80](https://github.com/nikneym/smooth-tables/commit/325fa80))

### 💅 Refactors

- Filter changes ([ab95965](https://github.com/nikneym/smooth-tables/commit/ab95965))
- Module initialization ([66eca24](https://github.com/nikneym/smooth-tables/commit/66eca24))

### 🏡 Chore

- Eslint ([deadadf](https://github.com/nikneym/smooth-tables/commit/deadadf))
- Add vueuse dependency ([0981bcb](https://github.com/nikneym/smooth-tables/commit/0981bcb))
- Changed `calc` to `update` ([76b9827](https://github.com/nikneym/smooth-tables/commit/76b9827))
- Remove TODO line ([510aa8d](https://github.com/nikneym/smooth-tables/commit/510aa8d))
- Disable wip caching for releasing current version ([b2f5bb3](https://github.com/nikneym/smooth-tables/commit/b2f5bb3))
- Playground changes ([03d589e](https://github.com/nikneym/smooth-tables/commit/03d589e))
- Package changes ([3d607cc](https://github.com/nikneym/smooth-tables/commit/3d607cc))
- Playground changes ([d19eaaf](https://github.com/nikneym/smooth-tables/commit/d19eaaf))
- Module rename in tests ([9ffc713](https://github.com/nikneym/smooth-tables/commit/9ffc713))
- Trying to satisfy ts ([79a9487](https://github.com/nikneym/smooth-tables/commit/79a9487))
- Reset version ([5b23d8c](https://github.com/nikneym/smooth-tables/commit/5b23d8c))

### ❤️ Contributors

- Nikneym ([@nikneym](http://github.com/nikneym))

