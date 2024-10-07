<script setup lang="ts">
import type Column from "../src/runtime/types/column";

const myData = ref<[]>([]);

const id = ref<number>(1);

const {
  data: swapiData,
  status,
  refresh,
} = await useAsyncData(
  "people",
  () => $fetch(`https://swapi.dev/api/people/?page=${id.value}`),
  {
    server: true,
    watch: [id],
  }
);

const results = computed(() =>
  status.value === "success" ? swapiData.value!.results : []
);

const settings = {
  estimateSize: () => 56,
  autoHeight: false,
  // @ts-expect-error
  // use the ID of a user as our key for each
  getItemKey: (rowData, index) => rowData.url,
  //width: 1024,
  height: 512,
};

const columns: Column[] = [
  {
    title: "Name",
    field: "name",
    format: (rowData) => rowData.name,
    flex: "1",
    search: {
      placeholder: "Search by name",
      filter: (rowData, key, query) =>
        rowData.name.toLowerCase().includes(query.toLowerCase()),
    },
  },
  {
    title: "Gender",
    field: "gender",
    format: (rowData) => rowData.gender,
    flex: "1",
  },
  {
    title: "Height",
    field: "height",
    format: (rowData) => rowData.height,
    flex: "1",
  },
  {
    title: "Hair Color",
    field: "hair-color",
    format: (rowData) => rowData.hair_color,
    flex: "1",
  },
  {
    title: "Eye Color",
    field: "eye-color",
    format: (rowData) => rowData.eye_color,
    flex: "1",
  },
  {
    title: "Birth Year",
    field: "birth-year",
    format: (rowData) => rowData.birth_year,
    flex: "1",
  },
];

// ref to our table to access it's methods
const table = ref();
</script>

<template>
  <!-- controls -->
  <button type="button" @click="results.splice(0, 1)">remove 1</button>
  <button type="button" @click="swapiData.results = []">remove all</button>
  <!-- @vue-expect-error -->
  <button type="button" @click="refresh">reload</button>
  <button type="button" @click="id--">previous</button>
  <button type="button" @click="id++">next</button>
  <!-- table -->
  <div class="wrapper">
    <SmoothTable
      ref="table"
      :columns="columns"
      :settings="settings"
      :data="results"
      :status="status"
    />
  </div>
</template>

<!-- local styles -->
<style scoped>
.wrapper {
  width: 1024px;
  margin: 1rem;
}

.img-wrapper {
  position: relative;
  width: 36px;
  height: 36px;
}

.img-wrapper img {
  position: relative;
  object-fit: cover;
  width: 100%;
  height: 100%;
  border-radius: 50%;
  border: 2px solid rebeccapurple;
}
</style>

<!-- global styles -->
<style>
html,
body {
  margin: 0;
  padding: 0;
}
</style>
