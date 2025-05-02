import { useQuery } from "react-query";
import { BASE_QUERY_OPTIONS } from "@/types/constand.ts";
import { getConfig } from "@/service/api/config.ts";

const useConfig = () => {
  const {
    isLoading,
    refetch,
    isFetching,
    data: resData,
  } = useQuery(["get-config"], async () => getConfig(), {
    ...BASE_QUERY_OPTIONS,
  });

  return {
    refetch,
    isFetching,
    data: resData?.[0],
  };
};

export default useConfig;
