import {
  reactive,
  shallowReactive,
  shallowRef,
  computed,
  watch,
  type Ref,
  type ComputedRef,
} from "vue";
import type { VirtualItem, Virtualizer } from "@tanstack/vue-virtual";

type VirtualizerRef = Ref<Virtualizer<HTMLDivElement, Element>>;

export interface Row {}

// Caches rows in ranges.
// Caching in ranges gives us fast resolve times in scrolling but it requires us to reset the cache whenever filtering/sorting has done.
export default function useRowCache(
  virtualizer: VirtualizerRef,
  computedData: ComputedRef<any[]>
) {
  const rowCache = reactive(new Map());
  const rows = shallowRef<[]>([]);

  function getBlockSize() {
    return Math.ceil();
  }

  const blockSize = getBlockSize();

  // Retrieves the key for a cache block by index.
  function getKey(index: number) {
    return Math.floor(index / blockSize);
  }

  function getFormattedBlock(index: number): any[] {
    const key = getKey(index);

    // key is not found in cache, let's create a cache block for this key
    if (!rowCache.has(key)) {
      const block = computedData.value.slice(
        key * blockSize,
        (key + 1) * blockSize
      );

      rowCache.set(key, block);
      // early return possible
      return block;
    }

    return rowCache.get(key);
  }

  watch(
    virtualizer,
    () => {
      // @ts-ignore
      // this method exists privately
      const indices: number[] = virtualizer.value.getIndexes();
      // @ts-ignore
      // this method exists privately
      const measurements: VirtualItem[] = virtualizer.value.getMeasurements();

      const items = [];

      console.log(getFormattedBlock(indices[0]));

      for (let k = 0; k < indices.length; k++) {
        const i = indices[k];
        const { index, key, size, start } = measurements[i];

        // push to cache
        const item = { index, key, size, start };

        items.push(item);
      }

      rows.value = items;
    },
    { immediate: true }
  );

  return rows;
}
