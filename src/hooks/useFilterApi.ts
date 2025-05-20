import { IFilter } from "@/types/filters.ts";
import { convertFiltersArrayToSearchString } from "@/utils/filter.ts";
import { urlJoins, urlParamsJoiner } from "@/utils/string.ts";

export const useFilterApi = (filters: IFilter[]) => {
  const joins: string[] = [];
  // make a copy of the filters array so we don't override the original
  const filtersCopy = [...filters];

  // pluck out the ipClient filter if found
  const ipClientFilterIndex = filtersCopy.findIndex(
    (filter) => filter.field === "clientIp",
  );
  const ipFilter =
    ipClientFilterIndex !== -1
      ? filtersCopy.splice(ipClientFilterIndex, 1)?.[0]
      : undefined;

  // convert the passed filters without ipClient
  let filterString = convertFiltersArrayToSearchString(filtersCopy);
  // if ipClient filter was provided,
  // filter by ipClient or devices.lastIpAddress
  // if (ipFilter) {
  //   filterString += `&or=clientIp||${ipFilter.condition}||${ipFilter.value}&or=devices.lastIpAddress||${ipFilter.condition}||${ipFilter.value}`;
  // }

  const joinString = urlJoins(...joins);
  return {
    filterUrl: urlParamsJoiner(filterString, joinString),
  };
};
