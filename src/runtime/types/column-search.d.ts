export type ColumnSearchFilterFn = <T>(
  rowData: T,
  query: string,
  field: string
) => boolean;

export default interface ColumnSearch {
  // placeholder string when the search input is empty
  placeholder?: string;
  // initial search input to be used if desired. Computed in SSR environment if possible
  initialQuery?: string;
  // filter function that defines the logic to filter items
  // works pretty much same as `Array.prototype.filter`
  filter: ColumnSearchFilterFn;
}
