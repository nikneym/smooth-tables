import { shallowReactive } from "vue";

// a filter function similar to one given to `Array.prototype.filter` is used for filtering
export type FilterFn = <T>(rowData: T, key: string, ...args: any[]) => boolean;

// unified filter message for all kinds of filter operations
export interface Filter {
  filter: FilterFn;
  // arguments that're passed to filter function
  args: any[];
}

// TODO: support initial filtering that's ran when the table has mounted
// Provides reactive and unified filter class which can be used for many kinds of filters
export default function useFilter() {
  // Filters are held like:
  // [key]: { filterFn, args }
  const filters = shallowReactive<Map<string, Filter>>(new Map());

  // Adds a filter to the `filters` by `key`.
  function add(key: string, filter: FilterFn, args: any[]): void {
    filters.set(key, { filter, args });
  }

  // Removes a filter from `filters` by `key`.
  function remove(key: string): void {
    filters.delete(key);
  }

  // Filters the given data by `filters`.
  function filter<T>(data: T[]): T[] {
    // if we don't have any filters, skip the for loop
    if (filters.size === 0) {
      return data;
    }

    // NOTE: seems like `for..of` on a Map and `Map.prototype.entries` are newer and therefore not widely supported
    // we've preferred ES5 version here for a wider support
    // https://stackoverflow.com/a/44134731
    const iterable = Array.from(filters.entries());

    // holds items that've passed all filter conditions
    const arr = [];

    // run our filters
    outer: for (const rowData of data) {
      for (const [field, { filter, args }] of iterable) {
        // if any of the conditions not met, continue our iteration and don't add this row
        if (!filter(rowData, field, ...args)) {
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
