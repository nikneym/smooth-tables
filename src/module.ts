import { defineNuxtModule, createResolver, addComponentsDir } from "@nuxt/kit";
import { name, version } from "../package.json";

// Module options TypeScript interface definition
export interface ModuleOptions {
  // Default is `Smooth`
  prefix?: string;
}

export default defineNuxtModule<ModuleOptions>({
  meta: {
    name,
    version,
    configKey: "smoothTables",
  },
  // Default configuration options of the Nuxt module
  defaults: {
    prefix: "Smooth",
  },
  setup({ prefix }, nuxt) {
    // a resolver to resolve paths obviously
    const { resolve } = createResolver(import.meta.url);

    // Transpile runtime
    const runtimeDir = resolve("./runtime");
    nuxt.options.build.transpile.push(runtimeDir);

    // CSS
    nuxt.options.css.push(resolve(runtimeDir, "base.css"));

    // themes
    // FIXME: make this interchangeable
    nuxt.options.css.push(resolve(runtimeDir, "themes", "industry.css"));

    nuxt.options.components = nuxt.options.components || [];

    // push our components
    nuxt.hook("components:dirs", (dirs) => {
      dirs.push({
        path: resolve(runtimeDir, "components"),
        prefix,
        global: true,
        watch: false,
        transpile: true,
        priority: 0,
      });
    });
  },
});
