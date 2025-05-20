import { useQuery } from "react-query";
import { BASE_QUERY_OPTIONS } from "@/types/constand.ts";
import { useEffect, useMemo, useState } from "react";
import { getProducts } from "@/service/api/product.ts";

const useProducts = () => {
  const [searchValue, setSearchValue] = useState("");
  const [filters, setFilters] = useState("");
  const [productData, setProductData] = useState({
    products: [],
    page: 1,
    total: 0,
    totalPages: 0,
  });

  const {
    isLoading,
    refetch,
    isFetching,
    data: resData,
  } = useQuery(
    ["get-products", filters, productData.page],
    async () => getProducts({ filter: filters, page: productData.page }),
    {
      ...BASE_QUERY_OPTIONS,
      onSuccess: (data) => {
        setProductData((prevState) => ({
          ...prevState,
          products: data.data,
          totalPages: data.pageCount,
          total: data.total,
        }));
      },
    },
  );

  useEffect(() => {
    if (searchValue) {
      setFilters(`filter=name||$contL||${searchValue.trim()}`);
    } else {
      setFilters("");
    }
  }, [searchValue]);

  const handlePageChange = (page: number) => {
    setProductData((prevState) => ({
      ...prevState,
      page,
    }));
  };

  const categoryObject = useMemo(() => {
    return resData?.data.reduce((arr, cur) => ({ ...arr, [cur.id]: cur }), {});
  }, [resData?.data]);

  return {
    isLoading,
    isFetching,
    categoryObject,
    productData,
    refetch,
    setSearchValue,
    handlePageChange,
  };
};

export default useProducts;
