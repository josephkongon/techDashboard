import { useQuery } from "react-query";
import { BASE_QUERY_OPTIONS } from "@/types/constand.ts";
import { useEffect, useMemo, useState } from "react";
import { getAllOrder } from "@/service/api/order.ts";

const useOrder = () => {
  const [searchValue, setSearchValue] = useState("");
  const [filters, setFilters] = useState("");

  const {
    isLoading,
    refetch,
    isFetching,
    data: resData,
  } = useQuery(
    ["get-all-orders", filters],
    async () => getAllOrder({ filter: filters }),
    {
      ...BASE_QUERY_OPTIONS,
    },
  );

  useEffect(() => {
    if (searchValue) {
      setFilters(`filter=shortId||$contL||${searchValue.trim()}`);
    } else {
      setFilters("");
    }
  }, [searchValue]);

  const orderObject = useMemo(() => {
    return resData?.data.reduce((arr, cur) => ({ ...arr, [cur.id]: cur }), {});
  }, [resData?.data]);

  return {
    isLoading,
    isFetching,
    orderObject,
    data: resData?.data,
    refetch,
    setSearchValue,
  };
};

export default useOrder;
