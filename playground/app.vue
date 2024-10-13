<script setup lang="ts">
import { SmoothActionDropdown } from "#components";
import data from "./data.json";
import type Column from "../src/runtime/types/column";

// @ts-expect-error
const myData = ref<[]>([...data]);

const id = ref<number>(1);

/* const {
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
); */

const settings = {
  estimateSize: () => 56,
  autoHeight: false,
  // @ts-expect-error
  // use the ID of a user as our key for each
  getItemKey: (rowData, index) => rowData.url,
  //width: 1024,
  height: 512,
};

const columns = ref<Column[]>([
  {
    title: "ID",
    field: "id",
    width: "200px",
    // @ts-expect-error
    format: (rowData) => rowData.user.id,
  },
  {
    field: "avatar",
    width: "54px",
    // @ts-expect-error
    format: (rowData) => rowData.user.avatar,
    hide: false,
  },
  {
    title: "Name",
    field: "name",
    width: "200px",
    // @ts-expect-error
    format: (rowData) => rowData.user.first_name,
    search: {
      placeholder: "Search by name",
      filter: (rowData: any, field: string, query: string) =>
        rowData.user["first_name"].toLowerCase().includes(query.toLowerCase()),
    },
  },
  {
    title: "Surname",
    field: "surname",
    width: "200px",

    // @ts-expect-error
    format: (rowData) => rowData.user.last_name,
    search: {
      placeholder: "Search by surname",
      filter: (rowData: any, _, query: string) =>
        rowData.user["last_name"].toLowerCase().includes(query.toLowerCase()),
    },
  },
  {
    title: "Place of Birth",
    field: "place-of-birth",
    width: "200px",

    // @ts-expect-error
    format: (rowData) => rowData.info.place_of_birth,
    selectable: {},
  },
  {
    title: "Age",
    field: "age",
    width: "200px",

    // @ts-expect-error
    format: (rowData) => {
      const date = new Date(rowData.user.date_of_birth);

      return new Date().getFullYear() - date.getFullYear();
    },
    search: {
      placeholder: "Search by surname",
      filter: (rowData: any, _, query: string) =>
        rowData.user["last_name"].toLowerCase().includes(query.toLowerCase()),
    },
  },
]);

// actions array defines operations that user can do on rows
const actions = [
  {
    field: "action-menu",
    render: SmoothActionDropdown,
    options: [
      { label: "Detayları Göster", action: () => console.log("details") },
      { label: "İş Girişi", action: () => console.log("inputs") },
      { label: "Vardiya Girişi", action: () => console.log("timings") },
      { label: "Düzenle", action: () => console.log("edit") },
      { label: "Sil", action: () => console.log("remove action") },
    ],
  },
];

// ref to our table to access it's methods
const table = ref();
</script>

<template>
  <!-- controls -->
  <button type="button" @click="myData.splice(0, 1)">remove 1</button>
  <button type="button" @click="myData = []">remove all</button>
  <!-- @vue-expect-error -->
  <button type="button" @click="myData = [...data]">reload</button>
  <!-- table -->
  <div class="wrapper">
    <SmoothTable
      ref="table"
      :columns="columns"
      :actions="actions"
      :settings="settings"
      :data="myData"
    >
      <template #avatar="{ value }">
        <div class="img-wrapper">
          <img :src="value" loading="lazy" />
        </div>
      </template>
    </SmoothTable>
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
