import React, { FC, useMemo } from "react";
import { Button } from "antd";
import AddProductToOrder from "@/pages/apps/Ecommerce/Orders/OrderDetails/component/AddProductToOrder.tsx";
import { useDisclosure } from "@/hooks/useDisclosure.ts";
import OrderItem from "@/pages/apps/Ecommerce/Orders/OrderDetails/component/OrderItem.tsx";

interface OrderItems {
  id: number;
  name: string;
  quantity: number;
  image: string;
  price: string;
  total: string;
}

interface ShippingAddress {
  provider: string;
  address: string;
  phone: string;
  mobile: string;
}

interface Billing {
  type: string;
  provider: string;
  valid: string;
}

interface Delivery {
  provider: string;
  order_id: string;
  payment_mode: string;
}
interface OrderDetailsType {
  id: string;
  tracking_id: string;
  order_status?: string;
  items: OrderItems[];
  sub_total: string;
  shipping_charge: string;
  tax: string;
  net_total: string;
  shipping: ShippingAddress;
  billing: Billing;
  delivery: Delivery;
}
interface IProps {
  refetch: () => void;
  order: any;
}

const OrderItems: FC<IProps> = ({ refetch, order }) => {
  const { isOpen, toggle } = useDisclosure();

  const totalCost = useMemo(() => {
    let total = 0;

    order?.orderProducts?.forEach((orderItem) => {
      total += orderItem?.price
        ? orderItem?.quantity * orderItem?.price
        : orderItem?.quantity * orderItem?.product?.price;
    });

    return total;
  }, [order]);
  return (
    <>
      <AddProductToOrder
        isOpen={isOpen}
        toggle={toggle}
        refetch={refetch}
        id={order?.id}
      />
      <div className="table-responsive">
        <table className="table table-bordered table-centered mb-0">
          <thead className="table-light">
            <tr>
              <th>Product name</th>
              <th>Product</th>
              <th>Quantity</th>
              <th>Price</th>
              <th>Total</th>
            </tr>
          </thead>
          <tbody>
            {(order?.orderProducts || []).map((item, index) => {
              return (
                <OrderItem key={index} orderItem={item} refetch={refetch} />
              );
            })}
            <tr>
              <th scope="row">
                <Button onClick={toggle}>+</Button>
              </th>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
            </tr>
            <tr>
              <th scope="row" colSpan={4} className="text-end">
                Sub Total :
              </th>
              <td>
                <div className="fw-bold">{totalCost}</div>
              </td>
            </tr>

            {/*<tr>*/}
            {/*  <th scope="row" colSpan={4} className="text-end">*/}
            {/*    Estimated Tax :*/}
            {/*  </th>*/}
            {/*  /!*<td>{order.tax}</td>*!/*/}
            {/*</tr>*/}
            <tr>
              <th scope="row" colSpan={4} className="text-end">
                Total :
              </th>
              <td>
                <div className="fw-bold"> {totalCost}</div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </>
  );
};

export default OrderItems;
