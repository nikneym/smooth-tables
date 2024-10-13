// virtual import
import type { AsyncDataRequestStatus } from "#app";

export type Key = string | number;

export interface Settings {
  // actual (or estimated if `autoHeight` is true) size true of each row
  estimateSize: <T>(rowData: T, index: number) => number;
  // whether or not heights of the rows calculated automatically
  autoHeight?: boolean;
  // unique key for each row
  getItemKey: <T>(rowData: T, index: number) => Key;
  // initial width of the table element in pixels
  width?: number;
  // height of the table element in pixels
  height: number;
  // number of items to render above and below the visible area, it's better to keep this low
  overscan?: number;
}

export interface Table {
  class?: string;
  settings: Settings;
  columns: Column[];
  actions: any[];
  // table row data
  data: any[];
  // data load status
  status?: AsyncDataRequestStatus;
}
