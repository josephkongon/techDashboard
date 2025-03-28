import React from "react";
import { Button, Card, Col, Row } from "react-bootstrap";
import PageTitle from "../../../../components/PageTitle";
import OrderTable from "@/pages/apps/Ecommerce/Orders/Components/OrderTable.tsx";
import { useIsMobile } from "@/hooks/useMediaQuery.ts";
import OrderItem from "@/pages/apps/Ecommerce/Orders/Components/OrderItem.tsx";
import useOrder from "@/hooks/queries/useOrder.ts";
import PaginatedList from "@/components/PaginatedList";

const Order = () => {
  const { data } = useOrder();

  const isMobile = useIsMobile();

  return (
    <>
      <PageTitle title={"Orders"} />

      <Row>
        <Col>
          <Card>
            <Card.Body>
              <Row className="align-items-center">
                <Col lg={8}>
                  <form className="row gy-2 gx-2 align-items-center justify-content-lg-start justify-content-between">
                    <div className="col-auto">
                      <div className="d-flex align-items-center w-auto">
                        <label htmlFor="status-select" className="me-2">
                          Status
                        </label>
                        <select
                          className="form-select"
                          id="status-select"
                          // onChange={(e: any) =>
                          //   changeOrderStatusGroup(e.target.value)
                          // }
                        >
                          <option value="All">All</option>
                          <option value="Paid">Paid</option>
                          <option value="Authorization">
                            Awaiting Authorization
                          </option>
                          <option value="Failed">Payment failed</option>
                          <option value="Unpaid">Unpaid</option>
                        </select>
                      </div>
                    </div>
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
