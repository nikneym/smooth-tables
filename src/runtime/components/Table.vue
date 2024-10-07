<script setup lang="ts">
import { ref, computed, watch, toRef } from "vue";
import { useVirtualizer } from "@tanstack/vue-virtual";
import useIsScrolling from "../composables/useIsScrolling";
import useFilter, { type FilterFn } from "../composables/useFilter";
import useScrollbarWidth from "../composables/useScrollbarWidth";
import ColumnSearch from "./Column/Search.vue";
import ColumnSelect from "./Column/Select.vue";
import type { Table } from "../types/table";

// Component definition
const props = withDefaults(defineProps<Table>(), { status: "success" });

// read-only ref to our status
const statusRef = toRef(() => props.status);

// destructing here once
const {
  settings: { estimateSize, getItemKey, overscan, autoHeight },
} = props;

// ref to our scroller element
const scrollElementRef = ref<HTMLDivElement | null>(null);
// tracks if `scrollElement` being scrolled or not
const isScrolling = useIsScrolling(scrollElementRef);
// reactively receive scrollbar width
const scrollbarWidth = useScrollbarWidth(scrollElementRef);

// it's better to do this here since it only runs once
const visibleColumns = computed(() =>
  props.columns.filter(({ hide }) => !hide)
);

const { add: addFilter, remove: removeFilter, filter } = useFilter();
// TODO: implement other filters
const filteredData = computed(() => filter(props.data));

// virtualizer setup
const virtualizerOptions = computed(() => {
  const { width, height } = props.settings;
  const filtered = filteredData.value;

  return {
    count: filtered.length,
    getScrollElement: () => scrollElementRef.value,
    estimateSize: (i: number) => estimateSize(filtered[i], i),
    getItemKey: (i: number) => getItemKey(filtered[i], i),
    // this allows us to do SSR if width and height are provided
    initialRect: { width, height },
    // for development
    debug: false,
    // also helps SSR
    initialOffset: () => 0,
    gap: 0,
    overscan,
  };
});

// precious virtualizer object
const virtualizer = useVirtualizer(virtualizerOptions);

const virtualRows = computed(() => virtualizer.value.getVirtualItems());

// size of virtualized area
const totalSize = computed(() => virtualizer.value.getTotalSize());

//const virtualRows = ref([]);
//const rows = useRowCache(virtualizer, filteredData);

/* functions */

function onColumnSearch(field: string, query: string, filter: FilterFn) {
  // empty query means filter has reset
  if (query === "") {
    return removeFilter(field);
  }

  // add the new filter
  return addFilter(field, filter, [query]);
}

function measureElement(el: Element) {
  if (!el) {
    return;
  }

  virtualizer.value.measureElement(el);

  return undefined;
}

// exposed utilities
defineExpose<{
  addFilter: typeof addFilter;
  removeFilter: typeof removeFilter;
}>({ addFilter, removeFilter });
</script>

<template>
  <!-- table pending & idle -->
  <div v-show="statusRef === 'pending' || statusRef === 'idle'">loading...</div>

  <!-- Table wrapper -->
  <!-- class here includes styles defined by user -->
  <div v-show="statusRef === 'success'" class="table" :class="$props.class">
    <!-- Table header -->
    <div class="header" :style="{ paddingRight: scrollbarWidth + 'px' }">
      <div
        v-for="{
          title,
          field,
          flex,
          width,
          search,
          selectable,
        } of visibleColumns"
        :key="field"
        :style="{ flex, width }"
        class="cell"
      >
        <!-- title -->
        <span class="col-title">{{ title }}</span>
        <!-- if column is searchable -->
        <ColumnSearch
          v-if="search"
          :field="field"
          :search="search"
          @change="onColumnSearch"
        />
        <ColumnSelect v-else-if="selectable" />
      </div>
    </div>
    <!-- Table body wrapper -->
    <!-- for some reason height has to be specified here if `useWindowVirtualizer` is not used (which is our case) -->
    <!-- https://github.com/TanStack/virtual/discussions/338 -->
    <div
      ref="scrollElementRef"
      class="body-wrapper"
      :style="{ height: settings.height + 'px' }"
    >
      <!-- Table body -->
      <TransitionGroup
        tag="div"
        class="body"
        name="list"
        :css="!isScrolling"
        :style="{ height: totalSize + 'px' }"
      >
        <div
          v-for="{ index, key, start, size } of virtualRows"
          :key="(key as PropertyKey)"
          :ref="autoHeight ? measureElement : undefined"
          v-memo="[size + 'px', autoHeight]"
          :data-index="index"
          :style="{
            height: autoHeight ? undefined : size + 'px',
            transform: `translate3d(0, ${start}px, 0)`,
          }"
          :class="index % 2 === 0 ? 'row-even' : 'row-odd'"
          class="row"
        >
          <!-- rendering rows without caching -->
          <div
            v-for="{ field, width, flex, format } of visibleColumns"
            :key="field"
            :style="{ flex, width }"
            class="cell"
          >
            <slot
              :name="field"
              :row-data="filteredData[index]"
              :value="format(filteredData[index], field)"
            >
              {{ format(filteredData[index], field) }}
            </slot>
          </div>
        </div>
      </TransitionGroup>
    </div>
  </div>
</template>

<style scoped>
.list-enter-active,
.list-leave-active {
  transition-property: opacity;
  transition-duration: 300ms;
  transition-timing-function: ease-in-out;
}

.list-move,
.list-enter-from,
.list-leave-to {
  opacity: 0;
}
</style>
