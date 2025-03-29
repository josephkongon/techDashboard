import React from "react";
import { Button, Card, Col, Row } from "react-bootstrap";
import { useParams } from "react-router-dom";

// components
import PageTitle from "../../../../../components/PageTitle";
import OrderItems from "@/pages/apps/Ecommerce/Orders/OrderDetails/component/OrderItems.tsx";
import { useMutation, useQuery } from "react-query";
import { getSingleOrder, updateOrder } from "@/service/api/order.ts";
import { Flex, message, Popover, Select, Spin } from "antd";
import { BASE_QUERY_OPTIONS } from "@/types/constand.ts";
import { formatToDate } from "@/utils/format.ts";
import Invoice from "@/pages/invoice/Invoice.tsx";
import { useDisclosure } from "@/hooks/useDisclosure.ts";
import { PaymentStatus } from "@/types/order.ts";
import { useTranslation } from "react-i18next";

const OrderDetails = () => {
  const param = useParams();
  const { isOpen, toggle } = useDisclosure();
  const { t } = useTranslation();

  const { isFetching, data, refetch } = useQuery(
    ["get-single-order", param?.id],
    () => getSingleOrder(param?.id),
    {
      ...BASE_QUERY_OPTIONS,
    },
  );

  const { isLoading, mutateAsync } = useMutation(async (payload: any) =>
    updateOrder(data?.id, payload),
  );

  return (
    <Spin spinning={isFetching}>
      <PageTitle title={"Order Detail"} />

      <Invoice
        isOpen={isOpen}
        toggle={toggle}
        products={data?.orderProducts}
        user={data?.user}
        order={data}
      />

      <Row>
        <Col lg={4}>
          <Card>
            <Card.Body>
              <h4 className="header-title mb-3">Track Order</h4>

              <Row>
                <Col lg={6}>
                  <div className="mb-4">
                    <h5 className="mt-0">Order ID:</h5>
                    <p>{data?.orderId}</p>
                  </div>
                </Col>

                <Col lg={6}>
                  <div className="mb-4">
                    <h5 className="mt-0">Name:</h5>
                    <p>{data?.user?.username}</p>
                  </div>
                </Col>
              </Row>

              <>
                <div className="track-order-list">
                  <ul className="list-unstyled">
                    <li className="completed">
                      <h5 className="mt-0 mb-1">Order Placed</h5>
                      <p className="text-muted">
                        {formatToDate(data?.createAt)}{" "}
                        <small className="text-muted">07:22 AM</small>{" "}
                      </p>
                    </li>

                    <li
                      className={`${data?.status === "Delivered" && "completed"}`}
                    >
                      <h5 className="mt-0 mb-1"> Delivered</h5>
                      <p className="text-muted">
                        Estimated delivery within 3 days
                      </p>
                    </li>
                  </ul>

                  <div className="text-center mt-4">
                    <Button
                      disabled={data?.orderProducts?.length < 1}
                      onClick={toggle}
                      className="btn btn-primary"
                    >
                      Show Invoice
                    </Button>
                  </div>
                </div>
              </>
            </Card.Body>
          </Card>
        </Col>

        <Col lg={8}>
          <Card>
            <Card.Body>
              <Flex className={"justify-content-between"}>
                <h4 className="header-title mb-3">
                  Items from Order {data?.orderId}
                </h4>
                <Popover
                  content={
                    <Select
                      value={data?.paymentStatus}
                      style={{ width: "12rem" }}
                      onSelect={(value) => {
                        mutateAsync(
                          { paymentStatus: value },
                          {
                            onSuccess: () => {
                              message.success("Payment status updated");
                              refetch();
                            },
                            onError: () => {
                              message.error("An error occured");
                            },
                          },
                        );
                      }}
                    >
                      {Object.values(PaymentStatus).map((item) => {
                        return (
                          <Select.Option key={item} value={item}>
                            {t(item)}
                          </Select.Option>
                        );
                      })}
                    </Select>
                  }
                  title={"Update status"}
                  trigger={"click"}
                >
                  <h4
                    className="header-title mb-3 bg-info p-1 "
                    style={{ cursor: "pointer" }}
                  >
                    Payment status: {t(data?.paymentStatus)}
                  </h4>
                </Popover>
              </Flex>
              <OrderItems refetch={refetch} order={data} />
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Spin>
  );
};

export default OrderDetails;
