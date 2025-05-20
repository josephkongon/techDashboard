import React from "react";
import { Button, Card, Col, Row } from "react-bootstrap";
import PageTitle from "../../../../components/PageTitle";
import OrderTable from "@/pages/apps/Ecommerce/Orders/Components/OrderTable.tsx";
import { useIsMobile } from "@/hooks/useMediaQuery.ts";
import OrderItem from "@/pages/apps/Ecommerce/Orders/Components/OrderItem.tsx";
import useOrder from "@/hooks/queries/useOrder.ts";
import PaginatedList from "@/components/PaginatedList";
import { Input } from "antd";

const { Search } = Input;

const Order = () => {
  const { data, setSearchValue } = useOrder();

  const isMobile = useIsMobile();

  const onSearch = (value, _e) => {
    _e.preventDefault();
    setSearchValue(value);
  };

  return (
    <>
      <PageTitle title={"Orders"} />

      <Row>
        <Col>
          <Card>
            <Card.Body>
              <Row className="align-items-center justify-content-between">
                <Col className="col-auto">
                  <form className="d-flex flex-wrap align-items-center">
                    <Search
                      placeholder="input search text"
                      onSearch={onSearch}
                      enterButton
                    />
                  </form>
                </Col>

                <Col lg={4}>
                  <div className="text-lg-end mt-xl-0 mt-2">
                    <Button className="btn btn-danger mb-2 me-2">
                      <i className="mdi mdi-basket me-1"></i> Add New Order
                    </Button>
                    <Button className="btn btn-light mb-2">Export</Button>
                  </div>
                </Col>
              </Row>
            </Card.Body>
          </Card>

          {isMobile ? (
            <div>
              {
                <PaginatedList
                  data={data}
                  RenderComponent={({ item }) => {
                    return <OrderItem order={item} />;
                  }}
                />
              }
            </div>
          ) : (
            <Card>
              <Card.Body>
                <OrderTable orders={data} />
              </Card.Body>
            </Card>
          )}
        </Col>
      </Row>
    </>
  );
};

export default Order;
