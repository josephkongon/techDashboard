import { IFilter } from "@/types/filters.ts";
import { SortDirection } from "@/types/constands/general.ts";

export const SUPPORTED_CONDITIONS = {
  equals: "$eq",
  notEquals: "$ne",
  includes: "$contL",
  excludes: "$exclL",
  starts: "$starts",
  ends: "$ends",
  greater: "$gt",
  greaterEqual: "$gte",
  lesser: "$lt",
  lesserEqual: "$lte",
  between: "between",
  in: "$in",
  notIn: "$notin",
  null: "$isnull",
  notNull: "$notnull",
  any: "$any",
} as const;

export const BASE_TABLE_STATE = {
  page: 1,
  pageSize: 100,
  density: "small",
  selectedRows: [] as string[],
  filters: [] as IFilter[],
  sort: {
    field: "createdAt",
    order: SortDirection.DESC,
  },
  updateVisibility: false,
  createVisibility: false,
  viewVisibility: false,
};
