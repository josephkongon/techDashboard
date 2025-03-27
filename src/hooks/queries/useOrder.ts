import { useQuery } from "react-query";
import { BASE_QUERY_OPTIONS } from "@/types/constand.ts";
import { useMemo } from "react";
import { getAllOrder } from "@/service/api/order.ts";

const useOrder = () => {
  const {
    isLoading,
    refetch,
    isFetching,
    data: resData,
  } = useQuery(["get-all-orders"], async () => getAllOrder(), {
    ...BASE_QUERY_OPTIONS,
  });

  const orderObject = useMemo(() => {
    return resData?.data.reduce((arr, cur) => ({ ...arr, [cur.id]: cur }), {});
  }, [resData?.data]);

  return {
    isLoading,
    isFetching,
    orderObject,
    data: resData?.data,
    refetch,
  };
};

export default useOrder;
