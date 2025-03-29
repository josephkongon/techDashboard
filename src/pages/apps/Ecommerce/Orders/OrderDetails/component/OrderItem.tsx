import React, { FC, useState } from "react";
import { useMutation, useQuery } from "react-query";
import { getProduct } from "@/service/api/product.ts";
import { BASE_QUERY_OPTIONS } from "@/types/constand.ts";
import { Button, Flex, InputNumber, message, Popover } from "antd";
import { Col } from "react-bootstrap";
import { updateOrderProduct } from "@/service/api/order.ts";

interface IProps {
  orderItem: any;
  refetch: () => void;
}
const OrderItem: FC<IProps> = ({ orderItem, refetch }) => {
  const [quantity, setQuantity] = useState<number>(orderItem?.quantity);
  const [price, setPrice] = useState<number>(
    orderItem?.price ? orderItem.price : orderItem?.product?.price,
  );
  const { data } = useQuery(
    ["get-single-product", orderItem.productId],
    () => getProduct(orderItem?.productId),
    {
      ...BASE_QUERY_OPTIONS,
    },
  );

  const { isLoading, mutateAsync } = useMutation(async (payload: any) =>
    updateOrderProduct(orderItem?.id, payload),
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
      <td>
        <Popover
          content={
            <Col>
              <InputNumber
                style={{ width: "12rem" }}
                min={1}
                value={quantity}
                onChange={(e) => setQuantity(e)}
              />
              <Flex
                style={{ alignItems: "flex-end", justifyContent: "flex-end" }}
              >
                <Button
                  loading={isLoading}
                  disabled={orderItem.quantity === quantity || !quantity}
                  variant={"filled"}
                  style={{ marginTop: 10 }}
                  onClick={() => {
                    mutateAsync(
                      { quantity },
                      {
                        onSuccess: () => {
                          message.success(
                            "Order has been updated successfully!",
                          );
                          refetch();
                        },
                        onError: () => {
                          message.error("Error updating Order");
                        },
                      },
                    );
                  }}
                >
                  Update
                </Button>
              </Flex>
            </Col>
          }
          title="Update Quantity"
          trigger="click"
        >
          <div>{orderItem.quantity}</div>
        </Popover>
      </td>
      <td>
        <Popover
          content={
            <Col>
              <Flex
                style={{
                  flexDirection: "column",
                  justifyContent: "flex-start",
                  alignItems: "flex-start",
                  marginBottom: "1rem",
                  gap: 5,
                }}
              >
                <div className="text-center">
                  Product price: {orderItem?.product?.price}
                </div>

                <div className="text-center">
                  Sold price: {orderItem?.price || orderItem?.product?.price}
                </div>
              </Flex>
              <InputNumber
                style={{ width: "12rem" }}
                min={1}
                max={orderItem?.product?.price}
                value={price}
                onChange={(e) => setPrice(e)}
              />
              <Flex
                style={{ alignItems: "flex-end", justifyContent: "flex-end" }}
              >
                <Button
                  loading={isLoading}
                  disabled={
                    orderItem.price
                      ? price === orderItem?.price
                      : price === orderItem?.product?.price
                  }
                  variant={"filled"}
                  style={{ marginTop: 10 }}
                  onClick={() => {
                    mutateAsync(
                      { price },
                      {
                        onSuccess: () => {
                          message.success(
                            "Order has been updated successfully!",
                          );
                          refetch();
                        },
                        onError: () => {
                          message.error("Error updating Order");
                        },
                      },
                    );
                  }}
                >
                  Update
                </Button>
              </Flex>
            </Col>
          }
          title="Update Price"
          trigger="click"
        >
          <div>
            {orderItem?.price ? orderItem.price : orderItem?.product?.price}
          </div>
        </Popover>
      </td>
      <td>
        {orderItem?.price
          ? orderItem.price * orderItem?.quantity
          : orderItem?.product?.price * orderItem.quantity}
      </td>
    </tr>
  );
};

export default OrderItem;
