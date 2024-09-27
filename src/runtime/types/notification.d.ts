// type of notification objects created by various filters
// even though what they do can vary (like searching, sorting etc.) they utilize the same notification format
// TODO: rename to FilterMessage
export default interface Notification {
  // notification type
  /*   kind: "search" | "sort";
  value: string; */
  // FIXME: filter type
  filter: (rowData, field, query) => boolean;
  query: string;
}
