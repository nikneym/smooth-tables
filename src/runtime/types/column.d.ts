import type ColumnSearch from "./column-search";

export default interface Column {
  // title of the column
  title?: string;
  // unique field name of the column
  field: string;
  // formatting of the data cells of this column
  // prefer providing `format` function over using a `<slot>` for formatting where possible since it's much more efficient
  format: <TRowData, TReturn>(rowData: TRowData, field: string) => TReturn;
  // whether or not column be shown
  hide?: boolean;
  // must be a valid CSS length unit
  width?: string;
  // must be a valid CSS flex value
  flex?: string;
  // search filter
  search?: ColumnSearch;
}
