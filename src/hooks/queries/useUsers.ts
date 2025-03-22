import { useMemo } from "react";
import { useQuery } from "react-query";
import { BASE_QUERY_OPTIONS } from "@/types/constand.ts";
import { getAllUsers } from "@/service/api/users.ts";

const useUsers = () => {
  const {
    isLoading,
    refetch,
    isFetching,
    data: resData,
  } = useQuery(["get-all-users"], async () => getAllUsers(), {
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

export default useUsers;
