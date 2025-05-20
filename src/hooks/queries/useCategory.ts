import { useEffect, useMemo, useState } from "react";
import { useQuery } from "react-query";
import { BASE_QUERY_OPTIONS } from "@/types/constand.ts";
import { getCategory } from "@/service/api/category.ts";

const useCategory = () => {
  const [searchValue, setSearchValue] = useState("");
  const [filters, setFilters] = useState("");

  const {
    isLoading,
    refetch,
    isFetching,
    data: resData,
  } = useQuery(
    ["get-category", filters],
    async () => getCategory({ filter: filters }),
    {
      ...BASE_QUERY_OPTIONS,
    },
  );

  useEffect(() => {
    if (searchValue) {
      setFilters(`filter=name||$contL||${searchValue.trim()}`);
    } else {
      setFilters("");
    }
  }, [searchValue]);

  const categoryObject = useMemo(() => {}, [resData?.data]);

  return {
    isLoading,
    isFetching,
    categoryObject,
    data: resData?.data,
    refetch,
    setSearchValue,
  };
};

export default useCategory;
