import { useCallback } from "react";
import { IFilter } from "@/types/filters.ts";

/**
 * A custom hook that provides filter functionalities
 * @function
 * @param {string} filterKey - Key to store filters in local storage
 * @param {function} dispatch - Dispatch function to set state
 * @param {IFilter[]} currentFilters - The filters from tableState
 * @param {Object} options - Additional options for the hook
 * @param {boolean} options.useLocalStorage - Whether to use local storage for storing filters (default: false)
 * @returns {Array} [filters, {addFilter, updateFilters, clearFilter}]
 * - filters: An array of IFilter objects
 * - addFilter: function to add a new filter
 * - updateFilters: function to update filters
 * - clearFilter: function to clear filters
 */
//@ts-ignore
const useFilters = (filterKey, dispatch, currentFilters) => {
  /**
   * UpdateFilters function replaces the filters at a given index in the stored filters array (if local storage is used)
   * and dispatches the updated filters to the consuming component.
   *
   * @param {IFilter[]} filters - The new array of filters that needs to be dispatched and potentially stored.
   * If USE_LOCAL_STORAGE is true, and filterNo is provided, then the function will update the stored filters array at the index
   * specified by filterNo (0-based) with the new filters array.
   *
   * The function updates the URL's query parameters. If filterNo is provided and filters array is empty,
   * it clears any existing query parameters. Otherwise, if USE_LOCAL_STORAGE is true, it appends or updates the filter query parameter
   * with the length of storedFilters + 1.
   *
   * Finally, the function then dispatches the filters array (unchanged).
   */
  const updateFilters = useCallback(
    (filters: IFilter[]) => {
      // if (USE_LOCAL_STORAGE) {
      // Extract the query parameters from the current URL.
      const search = new URL(window.location.href.replace("/#", "")).search;
      const searchParams = new URLSearchParams(search);
      const urlFilterNo = searchParams.get("filter");

      // console.log({ urlFilterNo });

      // Determine the filter number from the URL or set it as undefined.
      const filterNo = urlFilterNo ? parseInt(urlFilterNo) : undefined;

      // console.log({ filterNo });
      // Update the appropriate filter array in the storedFilters array.
      // if (filterNo) {
      //   storedFilters[filterNo - 1] = filters;
      // } else {
      //   storedFilters[storedFilters.length] = filters;
      // }

      // Update local storage with the new filters.
      // setItem(filterKey, storedFilters);

      // Update the URL's query parameters.
      // if (USE_LOCAL_STORAGE && !filters.length) {
      //   // If filters are empty, clear existing query parameters.
      //   navigate(location.pathname);
      //   // goto({ search: '' })
      // } else if (USE_LOCAL_STORAGE) {
      //   // Append or update the filter query parameter based on the filter number.
      //   const length = filterNo || storedFilters.length;
      //
      //   const currentSearchParams = new URLSearchParams(location.search);
      //   currentSearchParams.set("filter", length.toString());
      //   navigate(`${location.pathname}?${currentSearchParams.toString()}`);
      //   // goto({ search: `?filter=${length}` })
      // }
      // }
      dispatch({ filters });
    },
    [currentFilters],
  );

  /**
   * Add or update filters to the currentFilters array and persist them in local storage if necessary.
   * If the filter for a field already exists, it will be updated, otherwise, it will be added.
   *
   * @param {...IFilter[]} filters - Filters to be added or updated.
   */
  const addFilter = useCallback(
    (...filters: IFilter[]) => {
      if (!currentFilters.length) return updateFilters(filters);

      const changes: IFilter[] = [];

      // Iterates over each filter to be added or updated.
      filters.forEach((filter) => {
        // Finds the index of the filter with the same field, if it exists.
        const index = currentFilters.findIndex(
          //@ts-ignore
          (item) => item && item.field === filter.field,
        );

        if (index !== -1) {
          // If filter for the field already exists, updates it.
          currentFilters[index] = filter;
        } else {
          // Otherwise, adds the filter to changes.
          changes.push(filter);
        }
      });

      // Merges the updated filters and changes.
      currentFilters = [...currentFilters, ...changes];

      // Updates the filters in the context, state, etc.
      updateFilters(currentFilters);
    },
    [currentFilters],
  );

  const clearFilter = useCallback(
    (field?: string) => {
      if (field) {
        dispatch({
          //@ts-ignore
          filters: currentFilters.filter((filter) => field !== filter.field),
        });
      } else {
        dispatch({ filters: [] });
      }
    },
    [currentFilters],
  );

  return [currentFilters, { addFilter, updateFilters, clearFilter }];
};

export default useFilters;
