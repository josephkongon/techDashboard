import React, { FC } from "react";
import { Card } from "react-bootstrap";
import { Button, Flex, Table } from "antd";
import { formatToDate } from "@/utils/format.ts";

interface IProps {
  data: any[];
  isFetching: boolean;
  setUser: (i: any) => void;
  setUserOrder: (i: any) => void;
  toggleCreateOrder: () => void;
}
const UserTable: FC<IProps> = ({
  data,
  isFetching,
  setUser,
  setUserOrder,
  toggleCreateOrder,
}) => {
  const columns = [
    {
      title: "Name",
      dataIndex: "username",
      key: "username",
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
    },
    {
      title: "Phone",
      dataIndex: "phone",
      key: "phone",
    },
    {
      title: "Created at",
      dataIndex: "createdAt",
      key: "createdAt",
      render: (createdAt, record) => <div>{formatToDate(createdAt)}</div>,
    },
    {
      title: "Action",
      dataIndex: "action",
      key: "action",
      render: (action, record) => {
        return (
          <Flex style={{ gap: 5 }}>
            <Button
              onClick={() => {
                setUser(record);
              }}
            >
              Edit
            </Button>

            <Button
              onClick={() => {
                setUserOrder(record);
                toggleCreateOrder();
              }}
            >
              Create order
            </Button>
          </Flex>
        );
      },
    },
  ];

  return (
    <Card>
      <Card.Body>
        <Table
          rowKey={(row) => row.id}
          loading={isFetching}
          columns={columns}
          dataSource={data}
        />
      </Card.Body>
    </Card>
  );
};

export default UserTable;
