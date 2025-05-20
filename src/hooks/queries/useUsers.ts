import { useEffect, useMemo, useState } from "react";
import { useQuery } from "react-query";
import { BASE_QUERY_OPTIONS } from "@/types/constand.ts";
import { getAllUsers } from "@/service/api/users.ts";

const useUsers = () => {
  const [searchValue, setSearchValue] = useState("");
  const [filters, setFilters] = useState("");

  const {
    isLoading,
    refetch,
    isFetching,
    data: resData,
  } = useQuery(
    ["get-all-users", filters],
    async () => getAllUsers({ filter: filters }),
    {
      ...BASE_QUERY_OPTIONS,
    },
  );

  useEffect(() => {
    if (searchValue) {
      setFilters(`filter=username||$contL||${searchValue.trim()}`);
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

export default useUsers;
