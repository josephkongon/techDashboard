import { useMemo } from "react";
import { useQuery } from "react-query";
import { getCategoryGroup } from "@/service/api/categoryGroup.ts";
import { BASE_QUERY_OPTIONS } from "@/types/constand.ts";

const useCategoryGroups = () => {
  const {
    isLoading,
    refetch,
    isFetching,
    data: resData,
  } = useQuery(["category-groups"], async () => getCategoryGroup(), {
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

export default useCategoryGroups;
