import React, { FC } from "react";
import { Card } from "react-bootstrap";
import { Button, Table } from "antd";
import { formatToDate } from "@/utils/format.ts";

interface IProps {
  data: any[];
  isFetching: boolean;
  setCategory: (i: any) => void;
}
const CategoryTable: FC<IProps> = ({ data, isFetching, setCategory }) => {
  const columns = [
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
      sort: true,
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
          <Button
            onClick={() => {
              setCategory(record);
            }}
          >
            Edit
          </Button>
        );
      },
    },
  ];

  return (
    <Card>
      <Card.Body>
        <Table columns={columns} dataSource={data} />
      </Card.Body>
    </Card>
  );
};

export default CategoryTable;
