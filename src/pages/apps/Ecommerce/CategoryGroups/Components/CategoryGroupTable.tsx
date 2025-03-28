import React, { FC } from "react";
import { Card } from "react-bootstrap";
import { Button, Image, Table } from "antd";
import { formatToDate } from "@/utils/format.ts";

interface IProps {
  data: any[];
  isFetching: boolean;
  setGroup: (group: any) => void;
}
const CategoryGroupTable: FC<IProps> = ({ data, isFetching, setGroup }) => {
  const columns = [
    {
      title: "Image",
      dataIndex: "file.originalUrl",
      key: "file.originalUrl",
      render: (_, record) => (
        <Image
          style={{ height: 50, width: 50 }}
          src={record?.file?.originalUrl}
          alt=""
        />
      ),
    },
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
      sort: true,
    },
    {
      title: "Created At",
      dataIndex: "createdAt",
      key: "createdAt",
      render: (createdAt, record) => <div>{formatToDate(createdAt)}</div>,
    },
    {
      title: "Action",
      dataIndex: "action",
      key: "action",
      width: 120,
      render: (action, record) => {
        return (
          <Button
            onClick={() => {
              setGroup(record);
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
        <Table
          scroll={{ y: 700 }}
          loading={isFetching}
          columns={columns}
          dataSource={data}
        />
      </Card.Body>
    </Card>
  );
};

export default CategoryGroupTable;
