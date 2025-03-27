import React, { FC } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button, Flex, Table, TableColumnsType } from "antd";
import { BiPen } from "react-icons/bi";
import { EyeOutlined } from "@ant-design/icons";
import { Card } from "react-bootstrap";
import classNames from "classnames";
import { formatToDate } from "@/utils/format.ts";

interface IProps {
  orders: any[];
}

const OrderColumn = ({ row }: { row: any }) => {
  return (
    <>
      <Link to="/apps/ecommerce/order/details" className="text-body fw-bold">
        #BM{row.original.order_id}
      </Link>
    </>
  );
};

/* product column render */
const ProductsColumn = ({ row }: { row: any }) => {
  return (
    <>
      {(row.original.product_img || []).map((img: string, index: number) => {
        return (
          <Link to="/apps/ecommerce/product-details" key={index}>
            <img src={img} alt="" height="32" />
          </Link>
        );
      })}
    </>
  );
};

const PaymentStatusColumn = ({ status }: { status: string }) => {
  return (
    <>
      <h5>
        <span
          className={classNames("badge", {
            "bg-soft-success text-success": status === "Paid",
            "bg-soft-danger text-danger": status === "Payment Failed",
            "bg-soft-info text-info": status === "Unpaid",
            "bg-soft-warning text-warning": status === "Awaiting Authorization",
          })}
        >
          {status === "Paid" && <i className="mdi mdi-bitcoin me-1"></i>}
          {status === "Payment Failed" && (
            <i className="mdi mdi-cancel me-1"></i>
          )}
          {status === "Unpaid" && <i className="mdi mdi-cash me-1"></i>}
          {status === "Awaiting Authorization" && (
            <i className="mdi mdi-timer-sand me-1"></i>
          )}
          {status}
        </span>
      </h5>
    </>
  );
};

const StatusColumn = ({ status }: { status: string }) => {
  return (
    <>
      <h5>
        <span
          className={classNames("badge", {
            "bg-success": status === "Delivered",
            "bg-danger": status === "Cancelled",
            "bg-info": status === "Shipped",
            "bg-warning": status === "Processing",
            "bg-info-subtle": status === "Pending",
          })}
        >
          {status}
        </span>
      </h5>
    </>
  );
};

const OrderTable: FC<IProps> = ({ orders }) => {
  const navigate = useNavigate();

  const columns: TableColumnsType<any> = [
    {
      title: "Order ID",
      dataIndex: "orderId",
      key: "orderId",
    },

    {
      title: "Date",
      dataIndex: "createdAt",
      key: "createdAt",
      render: (order_status, order) => {
        return <>{formatToDate(order.createdAt)}</>;
      },
    },
    {
      title: "Payment status",
      dataIndex: "paymentStatus",
      key: "paymentStatus",
      render: (payment) => PaymentStatusColumn({ status: payment }),
    },
    {
      title: "Order Status",
      dataIndex: "status",
      key: "status",
      render: (status, order) => {
        return <>{StatusColumn({ status: status })}</>;
      },
    },
    {
      title: "Username",
      dataIndex: "user.username",
      key: "user.username",
      render: (_, record) => <>{record?.user?.username}</>,
    },
    {
      title: "Action",
      key: "operation",
      fixed: "right",
      width: 120,
      render: (_, record) => (
        <Flex style={{ gap: 5 }}>
          <Button variant={"filled"}>
            <BiPen />
          </Button>
          <Button
            onClick={() => {
              navigate(`${record.id}`);
            }}
          >
            <EyeOutlined />
          </Button>
        </Flex>
      ),
    },
  ];

  return (
    <Card>
      <Card.Body>
        <Table scroll={{ y: 700 }} columns={columns} dataSource={orders} />
      </Card.Body>
    </Card>
  );
};

export default OrderTable;
