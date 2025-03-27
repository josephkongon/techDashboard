import React, { FC } from "react";
import { useQuery } from "react-query";
import { getProduct } from "@/service/api/product.ts";
import { BASE_QUERY_OPTIONS } from "@/types/constand.ts";

interface IProps {
  orderItem: any;
}
const OrderItem: FC<IProps> = ({ orderItem }) => {
  const { isLoading, data } = useQuery(
    ["get-single-product", orderItem.productId],
    () => getProduct(orderItem?.productId),
    {
      ...BASE_QUERY_OPTIONS,
    },
  );
  return (
    <tr>
      <th scope="row" style={{ display: "flex", alignItems: "center" }}>
        {orderItem?.product?.name}
      </th>
      <td>
        <img
          src={data?.productImages?.[0]?.file?.thumbnailUrl}
          alt=""
          height="32"
        />
      </td>
      <td>{orderItem.quantity}</td>
      <td>{orderItem?.price ? orderItem.price : orderItem?.product?.price}</td>
      <td>
        {orderItem?.price
          ? orderItem.price * orderItem?.quantity
          : orderItem?.product?.price * orderItem.quantity}
      </td>
    </tr>
  );
};

export default OrderItem;
