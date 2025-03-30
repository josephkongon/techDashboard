import React, { FC } from "react";
import { Card } from "react-bootstrap";
import { Button, Table, Tag } from "antd";

interface IProps {
  data: any[];
  isFetching: boolean;
  setCategoryMenu: (i: any) => void;
}
const MenuTable: FC<IProps> = ({ data, isFetching, setCategoryMenu }) => {
  const columns = [
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
      sort: true,
    },
    {
      title: "Category groups",
      dataIndex: "categoryGroups",
      key: "categoryGroups",
      render: (_, record) => (
        <div>
          {record?.categoryGroups.map((item: any) => {
            return <Tag key={item?.id}>{item?.name}</Tag>;
          })}
        </div>
      ),
    },
    {
      title: "Action",
      dataIndex: "action",
      key: "action",
      render: (action, record) => {
        return (
          <Button
            onClick={() => {
              setCategoryMenu(record);
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

export default MenuTable;
