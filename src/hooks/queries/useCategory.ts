import { useMemo } from "react";
import { useQuery } from "react-query";
import { BASE_QUERY_OPTIONS } from "@/types/constand.ts";
import { getCategory } from "@/service/api/category.ts";

const useCategory = () => {
  const {
    isLoading,
    refetch,
    isFetching,
    data: resData,
  } = useQuery(["get-category"], async () => getCategory(), {
    ...BASE_QUERY_OPTIONS,
  });

  const categoryObject = useMemo(() => {}, [resData?.data]);

  return {
    isLoading,
    isFetching,
    categoryObject,
    data: resData?.data,
    refetch,
  };
};

export default useCategory;
