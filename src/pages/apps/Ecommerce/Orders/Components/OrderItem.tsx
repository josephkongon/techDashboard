import React from "react";
import { Card, Col, Row } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";

const OrderItem = () => {
  const navigate = useNavigate();
  return (
    <>
      <Row>
        <Col md={6} xl={3}>
          <Card
            className="product-box"
            onClick={() => {
              navigate("3");
            }}
          >
            <Card.Body>
              <div className="product-action">
                <Link
                  to="#"
                  className="btn btn-success btn-xs waves-effect waves-light me-1"
                >
                  <i className="mdi mdi-pencil"></i>
                </Link>
                <Link
                  to="#"
                  className="btn btn-danger btn-xs waves-effect waves-light"
                >
                  <i className="mdi mdi-close"></i>
                </Link>
              </div>

              <div className="product-info">
                <div className="row align-items-center">
                  <div className="col">
                    <h5 className="font-16 mt-0 sp-line-1">
                      <Link
                        to="/apps/ecommerce/product-details"
                        className="text-dark"
                      >
                        IPhone 16
                      </Link>
                    </h5>
                    <div className="text-warning mb-2 font-13">
                      <i className="fa fa-star me-1"></i>
                      <i className="fa fa-star me-1"></i>
                      <i className="fa fa-star me-1"></i>
                      <i className="fa fa-star me-1"></i>
                      <i className="fa fa-star"></i>
                    </div>
                    <h5 className="m-0">
                      {" "}
                      <span className="text-muted"> Stocks : 400 pcs</span>
                    </h5>
                  </div>
                  <div className="col-auto">
                    <div className="product-price-tag">30000</div>
                  </div>
                </div>
              </div>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </>
  );
};

export default OrderItem;
