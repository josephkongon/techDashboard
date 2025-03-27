import React, { FC, useEffect, useMemo } from "react";
import { useQuery } from "react-query";
import { getProduct } from "@/service/api/product.ts";
import Parser from "html-react-parser";
import { Spin } from "antd";

interface IItems {
  id: string;
  quantity: number;
  price: number;
}
interface IProps {
  id: string;
  itemNumber: number;
  quantity: number;
  setProductList: React.Dispatch<React.SetStateAction<IItems[]>>;
}
const ProductItem: FC<IProps> = ({
  id,
  itemNumber,
  quantity,
  setProductList,
}) => {
  const { isFetching, data } = useQuery(["get-product", id], () =>
    getProduct(id),
  );

  const total = useMemo(() => {
    return data?.price * quantity;
  }, [data, quantity]);

  useEffect(() => {
    if (data) {
      setProductList((prev) => {
        return prev.map((item) => {
          if (item.id === data.id) {
            item.price = data.price;
            return item;
          } else {
            return item;
          }
        });
      });
    }
  }, [data]);

  return (
    <tr key={data?.id}>
      <td>
        {itemNumber + 1} <Spin spinning={isFetching} />
      </td>
      <td>
        <b>{data?.name}</b> <br />
        {Parser(data?.description || "")}
      </td>
      <td>{quantity}</td>
      <td>{data?.price}</td>
      <td className="text-end">{total}</td>
    </tr>
  );
};

export default ProductItem;
