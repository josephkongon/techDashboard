import { useQuery } from "react-query";
import { BASE_QUERY_OPTIONS } from "@/types/constand.ts";
import { useMemo } from "react";
import { getProduct } from "@/service/api/product.ts";

const useProducts = () => {
  const {
    isLoading,
    refetch,
    isFetching,
    data: resData,
  } = useQuery(["get-products"], async () => getProduct(), {
    ...BASE_QUERY_OPTIONS,
  });

  const categoryObject = useMemo(() => {
    return resData?.data.reduce((arr, cur) => ({ ...arr, [cur.id]: cur }), {});
  }, [resData?.data]);

  return {
    isLoading,
    isFetching,
    categoryObject,
    data: resData?.data,
    refetch,
  };
};

export default useProducts;
