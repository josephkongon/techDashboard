import { IFilter } from "@/types/filters.ts";

export const convertFiltersArrayToSearchString = (
  filtersArray: IFilter[] | undefined,
): string => {
  if (!filtersArray?.length) {
    return "";
  }
  const search: string[] = [];

  for (const filterObj of filtersArray) {
    const { condition, field, value } = filterObj;
    if (value?.length > 0) {
      search.push([field, condition, value].filter(Boolean).join("||"));
    }
  }

  return search.length > 0 ? `filter=${search.join("&filter=")}` : "";
};
