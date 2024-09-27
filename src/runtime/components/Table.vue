<script setup lang="ts">
import { ref, reactive, computed, watch, onMounted } from "vue";
import { useVirtualizer } from "@tanstack/vue-virtual";
import type Column from "../types/column";
import ColumnSearch from "./ColumnSearch.vue";
import type Notification from "../types/notification";
import useIsScrolling from "../composables/useIsScrolling";

// Component definition
const props = defineProps<Props>();

// destructing here once
const {
  settings: { estimateSize, getItemKey, overscan, autoHeight },
} = props;

// ref to our scroller element
const scrollElementRef = ref<HTMLDivElement | null>(null);
// tracks if `scrollElement` being scrolled or not
const isScrolling = useIsScrolling(scrollElementRef);

// it's better to do this here since it only runs once
const visibleColumns = computed(() =>
  props.columns.filter(({ hide }) => !hide)
);

// table filters kept as `Record` like in the following:
// filters[field] = { filterFn: () => { ... }, query: string };
// FIXME: we may prefer `Map` or `Set` data type here
const filters = reactive<Record<string, Notification>>({
  /*   name: {
    // @ts-expect-error
    filter: (rowData: any, query: string) =>
      rowData.user["first_name"].toLowerCase().includes(query.toLowerCase()),
    query: "mehmet",
  }, */
});

// TODO: implement other filters
const filteredData = computed(() => {
  // assign here to reactively listen `props.data`
  const d = props.data;
  // make filters iterable
  const iterableFilters = Object.entries(filters);

  // if we don't have any filters, skip the for loop
  if (iterableFilters.length === 0) {
    return d;
  }

  // holds items that've passed all filter conditions
  const arr = [];

  // run our filters
  outer: for (const rowData of d) {
    for (const [field, { filter, query }] of iterableFilters) {
      // if any of the conditions not met, continue our iteration and don't add this row
      // @ts-expect-error
      if (!filter(rowData, query, field)) {
        continue outer;
      }
    }

    // all conditions met
    arr.push(rowData);
  }

  return arr;
});

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
    // also helps SSR
    initialOffset: () => 0,
    gap: 0,
    overscan,
  };
});

// precious virtualizer object
const virtualizer = useVirtualizer(virtualizerOptions);

const virtualRows = computed(() => virtualizer.value.getVirtualItems());

function onChange(field: string, query: string, filter: () => boolean) {
  // empty query means this filter has reset
  if (query === "") {
    delete filters[field];
    return;
  }

  // add the new filter
  filters[field] = { filter, query };
}

function measureElement(el: Element) {
  if (!el) {
    return;
  }

  virtualizer.value.measureElement(el);

  return undefined;
}

// size of virtualized area
const totalSize = computed(() => virtualizer.value.getTotalSize());
</script>

<script lang="ts">
interface Props {
  class?: string;
  settings: Settings;
  columns: Column[];
  data: any[];
}

type Key = string | number;

interface Settings {
  // actual (or estimated if `autoHeight` is true) size true of each row
  estimateSize: <T>(rowData: T, index: number) => number;
  // unique key for each row
  getItemKey: <T>(rowData: T, index: number) => Key;
  // initial width of the table element in pixels
  width?: number;
  // height of the table element in pixels
  height: number;
  // number of items to render above and below the visible area, it's better to keep this low
  overscan?: number;
  // whether or not heights of the rows calculated automatically
  autoHeight?: boolean;
}
</script>

<template>
  <!-- Table wrapper -->
  <!-- class here includes styles defined by user -->
  <div class="table" :class="$props.class">
    <!-- Table header -->
    <div class="header">
      <div
        v-for="{ title, field, flex, width, search } of visibleColumns"
        :key="field"
        :style="{ flex, width }"
        class="cell"
      >
        <span class="col-title">{{ title }}</span>
        <ColumnSearch
          v-if="search"
          :field="field"
          :search="search"
          @change="onChange"
        />
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
  transition-property: opacity, translate;
  transition-duration: 300ms;
  transition-timing-function: ease-in-out;
}

.list-move,
.list-enter-from,
.list-leave-to {
  opacity: 0;
  /* `transform` is used by virtualizer so we'll prefer `translate` for animations here */
  translate: 0 100px;
}
</style>
