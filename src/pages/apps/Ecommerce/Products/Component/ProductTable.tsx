import React, { FC } from "react";
import { Card, Col } from "react-bootstrap";
import { Button, Flex, Image, Table, TableColumnsType } from "antd";
import { EyeOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";

interface IProps {
  products: any[];
  isFetching: boolean;
  pagination?: {
    current: number;
    pageSize: number;
    total: number;
  };
  handlePageChange: (page: number) => void;
}
const ProductTable: FC<IProps> = ({
  products,
  isFetching,
  pagination,
  handlePageChange,
}) => {
  const navigate = useNavigate();

  const columns: TableColumnsType<any> = [
    {
      title: "Image",
      dataIndex: "image",
      key: "image",
      render: (_, product) => {
        return (
          <Image
            src={product?.productImages?.[0]?.file.thumbnailUrl}
            height={60}
            width={60}
          />
        );
      },
    },
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Price",
      dataIndex: "price",
      key: "price",
    },

    {
      title: "Quantity",
      dataIndex: "quantity",
      key: "quantity",
    },
    {
      title: "Action",
      key: "operation",
      fixed: "right",
      width: 100,
      render: (item) => (
        <Flex style={{ gap: 5 }}>
          {/*<Button variant={"filled"}>*/}
          {/*  <BiPen />*/}
          {/*</Button>*/}
          <Button
            onClick={() => {
              navigate(`${item.id}`);
            }}
          >
            <EyeOutlined />
          </Button>
        </Flex>
      ),
    },
  ];

  console.log(pagination);

  return (
    <Card>
      <Card.Body>
        <Col className={"flex p-1 justify-content-end align-content-end"}>
          Total {pagination.total}
        </Col>
        <Table
          rowKey={(item) => item?.id}
          loading={isFetching}
          columns={columns}
          dataSource={products}
          pagination={{
            ...pagination,
            onChange: (page, size) => {
              handlePageChange(page);
            },
          }}
        />
      </Card.Body>
    </Card>
  );
};

export default ProductTable;
