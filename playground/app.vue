<script setup lang="ts">
import data from "./data.json";

// @ts-expect-error
const myData = ref<[]>([...data]);

const columns = ref([
  {
    title: "ID",
    field: "id",
    flex: "0.5",
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
    flex: "1",
    // @ts-expect-error
    format: (rowData) => rowData.user.first_name,
    search: {
      placeholder: "Search by name",
      filter: (rowData: any, query: string) =>
        rowData.user["first_name"].toLowerCase().includes(query.toLowerCase()),
    },
  },
  {
    title: "Surname",
    field: "surname",
    flex: "1",
    // @ts-expect-error
    format: (rowData) => rowData.user.last_name,
    search: {
      placeholder: "Search by surname",
      filter: (rowData: any, query: string) =>
        rowData.user["last_name"].toLowerCase().includes(query.toLowerCase()),
    },
  },
  {
    title: "Place of Birth",
    field: "place-of-birth",
    flex: "1",
    // @ts-expect-error
    format: (rowData) => rowData.info.place_of_birth,
    search: {
      placeholder: "Search by birth place",
      filter: (rowData: any, query: string) =>
        rowData.info["place_of_birth"]
          .toLowerCase()
          .includes(query.toLowerCase()),
    },
  },
  {
    title: "Age",
    field: "age",
    flex: "1",
    // @ts-expect-error
    format: (rowData) => {
      const date = new Date(rowData.user.date_of_birth);

      return new Date().getFullYear() - date.getFullYear();
    },
  },
]);

const settings = {
  estimateSize: () => 52,
  // @ts-expect-error
  // use the ID of a user as our key for each
  getItemKey: (rowData, index) => rowData.user.id,
  autoHeight: true,
  overscan: 13,
  width: 1024,
  height: 512,
};
</script>

<template>
  <!-- controls -->
  <button type="button" @click="myData.splice(0, 1)">remove 1</button>
  <button type="button" @click="myData = []">remove all</button>
  <!-- @vue-expect-error -->
  <button type="button" @click="myData = [...data]">reload</button>
  <!-- table -->
  <div class="wrapper">
    <Table :columns="columns" :settings="settings" :data="myData">
      <template #avatar="{ value }">
        <div class="img-wrapper">
          <!-- @vue-expect-error -->
          <img :src="value" />
        </div>
      </template>
    </Table>
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
