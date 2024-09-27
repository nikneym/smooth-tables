import { defineNuxtModule, createResolver, addComponentsDir } from "@nuxt/kit";

// Module options TypeScript interface definition
export interface ModuleOptions {}

export default defineNuxtModule<ModuleOptions>({
  meta: {
    name: "my-module",
    configKey: "myModule",
  },
  // Default configuration options of the Nuxt module
  defaults: {},
  setup(_options, nuxt) {
    // @ts-expect-error
    const { resolve } = createResolver(import.meta.url);

    // Transpile runtime
    const runtimeDir = resolve("./runtime");
    nuxt.options.build.transpile.push(runtimeDir);

    // CSS
    nuxt.options.css.push(resolve(runtimeDir, "base.css"));

    // themes
    // FIXME: make this interchangeable
    nuxt.options.css.push(resolve(runtimeDir, "themes", "industry.css"));

    // components
    addComponentsDir({
      path: resolve(runtimeDir, "components"),
      watch: false,
    });
  },
});
