<!-- implements a small searcher based on column values -->
<script setup lang="ts">
import { ref, watch, onBeforeMount } from "vue";
import type ColumnSearch from "../types/column-search";

// component definition
const { field, search } = defineProps<Props>();

// emits
const emits = defineEmits<{
  // FIXME: filter type
  (e: "change", field: string, query: string, filter: any): void;
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

function onQueryChange(newQuery: string, oldQuery: string | undefined) {
  const newQueryTrim = newQuery.trim();
  const oldQueryTrim = oldQuery.trim();

  // don't notify the caller if trimmed results are same
  if (newQueryTrim === oldQueryTrim) {
    return;
  }

  // filter notification
  emits("change", field, newQueryTrim, filter);
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
  <input
    :id="field"
    v-model="query"
    :name="field"
    :placeholder="placeholder"
    :tabindex="0"
    type="text"
  />
</template>

<!-- FIXME: either move this to CSS file or make it a module block -->
<style scoped>
/* FIXME: take styles from the theme instead of defining here */
input[type="text"] {
  /* reset all the styles */
  all: unset;
  position: relative;
  display: block;
  width: calc(100% - calc(var(--tt-padding-left) + var(--tt-padding-right)));
  background-color: white;
  border: 1px solid var(--tt-border-color);
  border-radius: 0.25rem;
  font-size: 0.75rem;
  font-weight: 400;
  color: rgb(65 83 97);
  padding-left: 0.25rem;
  padding-right: 0.25rem;
  padding-top: 0.375rem;
  padding-bottom: 0.375rem;
}

input[type="text"]:focus {
  outline: 0.125rem solid rgb(245 174 30);
  outline-offset: 0;
}
</style>
