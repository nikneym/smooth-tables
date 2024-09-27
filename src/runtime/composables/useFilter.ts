import { reactive } from "vue";
import type Notification from "../types/notification";

// TODO: support initial filtering that's on when the table has mounted
// Provides reactive and unified filter class which can be used for many kinds of filters
export default function useFilter() {
  // Filters are hold like:
  // "name": { filter, query }
  const filters = reactive<Map<string, Notification>>(new Map());

  /*   name: {
    // @ts-expect-error
    filter: (rowData: any, query: string) =>
      rowData.user["first_name"].toLowerCase().includes(query.toLowerCase()),
    query: "mehmet",
  }, */

  // Adds a filter to the `filters` by `field`.
  function add(key: string, filterFn: () => boolean, query: string): void {
    // add the new filter
    //filters[field] = { filter: filterFn, query };
    filters.set(key, { filter: filterFn, query });
  }

  // Removes a filter from `filters` by `field`.
  function remove(key: string): void {
    //delete filters[field];
    filters.delete(key);
  }

  // TODO: implement other filters
  // Filters the given data by `filters`.
  function filter<T>(data: T[]): T[] {
    // if we don't have any filters, skip the for loop
    if (filters.size === 0) {
      return data;
    }

    // NOTE: seems like `for..of` on a Map and `Map.prototype.entries` are newer and therefore not widely supported
    // we've preferred ES5 version here for a wider support
    // https://stackoverflow.com/a/44134731
    const iterableFilters = Array.from(filters.entries());

    // holds items that've passed all filter conditions
    const arr = [];

    // run our filters
    outer: for (const rowData of data) {
      for (const [field, { filter, query }] of iterableFilters) {
        // if any of the conditions not met, continue our iteration and don't add this row
        if (!filter(rowData, query, field)) {
          continue outer;
        }
      }

      // all conditions met
      arr.push(rowData);
    }

    return arr;
  }

  return { add, remove, filter };
}
