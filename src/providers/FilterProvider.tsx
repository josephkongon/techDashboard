import React, { createContext, FC, useContext, useMemo, useState } from "react";
import useFilters from "@/hooks/useFilters";
import { BASE_TABLE_STATE } from "@/types/constands/filters.ts";
import { useFiltersReturnType } from "@/types/filters.ts";

/**
 * The initial state of the table
 * @type {Object}
 * @property {Object} tableState - The current state of the table
 * @property {any} tableState.selectedRecord - The selected record of the table
 * @property {number} tableState.page - The current page number of the table
 * @property {number} tableState.pageSize - The page size of the table
 * @property {SizeType} tableState.density - The density of the table
 * @property {string[]} tableState.selectedRows - The selected rows of the table
 * @property {IFilter[]} tableState.filters - The filters of the table
 * @property {Object} tableState.sort - The sorting of the table
 * @property {string} tableState.sort.field - The field being sorted by
 * @property {SortDirection} tableState.sort.order - The order of the sorting
 * @property {function} dispatch - The function to update the state of the table
 */

interface IContext<T = any> {
  tableState: typeof BASE_TABLE_STATE & {
    selectedRecord: T | undefined;
  };

  forceUpdate(): void;

  dispatch: (state: Partial<typeof tableState>) => void;
  filtersHook?: useFiltersReturnType;
}

const tableState = {
  ...BASE_TABLE_STATE,
  selectedRecord: undefined as any,
};

const DEFAULT_STATE: IContext = {
  tableState,
  forceUpdate: () => {},
  dispatch: (state: Partial<typeof tableState>) => {},
};

const FilterContext = createContext<IContext>(DEFAULT_STATE);

/**
 * The provider component for the table context
 * @param {Object} props - The component props
 * @param {string} props.name - The name of the table
 * @return {JSX.Element} - The provider component
 */
interface IProps {
  name: string;
  overrides?: Partial<typeof tableState>;
  children: React.ReactNode;
}

export const FilterProvider: FC<IProps> = ({ children, name, overrides }) => {
  const [t, setT] = useState(0);
  const forceUpdate = () => setT((prev) => prev + 1);

  const initialState: typeof DEFAULT_STATE = {
    tableState: { ...DEFAULT_STATE.tableState },
    forceUpdate,
    dispatch: (state: Partial<typeof tableState>) => {},
  };

  // override the initial state with the overrides if provided
  initialState.tableState = {
    ...DEFAULT_STATE.tableState,
    filters: [],
    ...overrides,
  };

  // Define state for tableState and setter function to update it
  const [tableState, setTableState] = useState(initialState.tableState);

  // Function to update tableState using setState
  const dispatch = (
    newState: Partial<(typeof DEFAULT_STATE)["tableState"]>,
  ) => {
    setTableState((previousState) => ({
      ...previousState,
      ...newState,
      page: newState.page ?? (newState.filters ? 1 : previousState.page),
    }));
  };

  // Get filters hook
  const filtersHook = useFilters(
    `${name}-filters`,
    dispatch,
    tableState.filters,
  );

  // Memoized context values that will be provided to FilterProvider
  const contextValues = useMemo(
    () => ({
      tableState,
      forceUpdate,
      dispatch,
      filtersHook,
    }),
    [tableState, t],
  );

  // Return provider component that provides context values to its children
  return (
    //@ts-ignore
    <FilterContext.Provider value={contextValues}>
      {children}
    </FilterContext.Provider>
  );
};

export default FilterProvider;

export const useFilterProvider = () => {
  return useContext(FilterContext);
};
