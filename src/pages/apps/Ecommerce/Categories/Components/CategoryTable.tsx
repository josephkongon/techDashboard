import React, { FC } from "react";
import { Card } from "react-bootstrap";
import { Table } from "antd";
import { formatToDate } from "@/utils/format.ts";

interface IProps {
  data: any[];
  isFetching: boolean;
}
const CategoryTable: FC<IProps> = ({ data, isFetching }) => {
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
