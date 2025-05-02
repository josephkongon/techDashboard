import React, { FC } from "react";
import { Card, Col, Row } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";

interface IProps {
  order: any;
}
const OrderItem: FC<IProps> = ({ order }) => {
  const navigate = useNavigate();

  return (
    <>
      <Row>
        <Col md={6} xl={3}>
          <Card
            style={{ padding: "1em" }}
            className="product-box"
            onClick={() => {
              navigate(order?.id);
            }}
          >
            <div className="product-info">
              <div className="row align-items-center">
                <div className="col">
                  <h5 className="font-16 mt-0 sp-line-1">
                    <Link to="" className="text-dark">
                      {order?.shortId}
                    </Link>
                  </h5>

                  <h5 className="m-0">
                    <span className="text-muted">
                      Name : {order?.user?.username}
                    </span>
                  </h5>
                </div>
                <div className="col-auto">
                  <div style={{ marginBottom: "10px" }}>
                    Order status : {order?.status}
                  </div>
                  <div>Payment status : {order?.paymentStatus}</div>
                </div>
              </div>
            </div>
          </Card>
        </Col>
      </Row>
    </>
  );
};

export default OrderItem;
