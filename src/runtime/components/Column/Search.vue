<!-- implements a small searcher based on column values -->
<script setup lang="ts">
import { ref, watch, onBeforeMount } from "vue";
import type ColumnSearch from "../../types/column-search";
import type { FilterFn } from "../../composables/useFilter";

// component definition
const { field, search } = defineProps<Props>();

// emits
const emits = defineEmits<{
  (e: "change", field: string, query: string, filter: FilterFn): void;
}>();

// search object destruction
const { placeholder, initialQuery, filter } = search;

const query = ref<string>("");

// emit `change` events to caller whenever `query` changes
watch(query, onQueryChange);

// if the `initialQuery` is given, update our query to trigger client-side filtering
onBeforeMount(() => {
  if (initialQuery) {
    query.value = initialQuery;
  }
});

function onQueryChange(newQuery: string, oldQuery: string) {
  const newQueryTrim = newQuery.trim();
  const oldQueryTrim = oldQuery.trim();

  // don't notify the caller if trimmed results are same
  if (newQueryTrim === oldQueryTrim) {
    return;
  }

  // filter notification
  emits("change", field, newQueryTrim, filter);
}

function resetAndFocus(e: MouseEvent) {
  query.value = "";

  // @ts-expect-error
  (e.currentTarget.parentElement.firstChild as HTMLInputElement).focus();
}
</script>

<script lang="ts">
interface Props {
  // MUST be same as column's field value
  field: string;
  // everything else needed by this component
  search: ColumnSearch;
}
</script>

<template>
  <div class="filter-wrapper">
    <input
      :id="field"
      v-model="query"
      :name="field"
      :placeholder="placeholder"
      :tabindex="0"
      type="text"
      @keyup.escape="query = ''"
    />
    <!-- reset query button -->
    <button
      v-if="query.length > 0"
      type="button"
      class="clear"
      @click="resetAndFocus"
    />
  </div>
</template>
