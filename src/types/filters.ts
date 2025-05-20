import { SUPPORTED_CONDITIONS } from "@/types/constands/filters.ts";

export interface IFilter {
  field: string;
  label?: string;
  value?: any;
  condition: (typeof SUPPORTED_CONDITIONS)[keyof typeof SUPPORTED_CONDITIONS];
}

export type useFiltersReturnType = [
  IFilter[],
  {
    addFilter: (...v: IFilter[]) => void;
    updateFilters: (v: IFilter[]) => void;
    clearFilter: (field?: string) => void;
  },
];
