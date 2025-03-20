import React, { useMemo, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { Card, Col, Nav, ProgressBar, Row, Tab } from "react-bootstrap";
import Parser from "html-react-parser";
import PageTitle from "../../../../../components/PageTitle";
import useProducts from "@/hooks/queries/useProducts.ts";
import { CURRENCY } from "@/types/constand";

interface Product {
  brand: string;
  name?: string;
  reviews: string;
  status: string;
  discount: number;
  price: number;
  description: string;
  rating: number;
  features: string[];
}

// Stock Table
const Stocks = () => {
  return (
    <>
      <div className="table-responsive mt-4">
        <table className="table table-bordered table-centered mb-0">
          <thead className="table-light">
            <tr>
              <th>Outlets</th>
              <th>Price</th>
              <th>Stock</th>
              <th>Revenue</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>ASOS Ridley Outlet - NYC</td>
              <td>$139.58</td>
              <td>
                <div className="row align-items-center g-0">
                  <div className="col-auto">
                    <span className="me-2">27%</span>
                  </div>
                  <div className="col">
                    <ProgressBar
                      now={27}
                      className="progress-sm"
                      variant="danger"
                    />
                  </div>
                </div>
              </td>
              <td>$1,89,547</td>
            </tr>
            <tr>
              <td>Marco Outlet - SRT</td>
              <td>$149.99</td>
              <td>
                <div className="row align-items-center g-0">
                  <div className="col-auto">
                    <span className="me-2">71%</span>
                  </div>
                  <div className="col">
                    <ProgressBar
                      now={71}
                      className="progress-sm"
                      variant="success"
                    />
                  </div>
                </div>
              </td>
              <td>$87,245</td>
            </tr>
            <tr>
              <td>Chairtest Outlet - HY</td>
              <td>$135.87</td>
              <td>
                <div className="row align-items-center g-0">
                  <div className="col-auto">
                    <span className="me-2">82%</span>
                  </div>
                  <div className="col">
                    <ProgressBar
                      now={82}
                      className="progress-sm"
                      variant="success"
                    />
                  </div>
                </div>
              </td>
              <td>$5,87,478</td>
            </tr>
            <tr>
              <td>Nworld Group - India</td>
              <td>$159.89</td>
              <td>
                <div className="row align-items-center g-0">
                  <div className="col-auto">
                    <span className="me-2">42%</span>
                  </div>
                  <div className="col">
                    <ProgressBar
                      now={42}
                      className="progress-sm"
                      variant="warning"
                    />
                  </div>
                </div>
              </td>
              <td>$55,781</td>
            </tr>
          </tbody>
        </table>
      </div>
    </>
  );
};

const ProductDetails = () => {
  const { categoryObject } = useProducts();

  const param = useParams();

  const productItem = useMemo(
    () => categoryObject?.[param.id] || {},
    [categoryObject, param?.id],
  );

  console.log({ productItem });
  const [product] = useState<Product>({
    brand: "Jack & Jones",
    name: "Jack & Jones Men's T-shirt (Blue)",
    reviews: "36",
    status: "Instock",
    discount: 20,
    price: 80,
    description:
      "The languages only differ in their grammar, their pronunciation and their most common words. Everyone realizes why a new common language would be desirable: one could refuse to pay expensive translators.",
    rating: 4.5,
    features: [
      "Sed ut perspiciatis unde",
      "Itaque earum rerum hic",
      "Nemo enim ipsam voluptatem",
      "Donec quam felis ultricies nec",
      "Temporibus autem quibusdam et",
    ],
  });

  const [discountPrice] = useState<number>(
    Math.round(product.price - (product.price * product.discount) / 100),
  );

  return (
    <>
      <PageTitle title={"Product Detail"} />

      <Row>
        <Col>
          <Card>
            <Card.Body>
              <Row>
                <Col lg={5}>
                  <Tab.Container
                    id="left-tabs-example"
                    defaultActiveKey={productItem?.productImages?.[0]?.id}
                  >
                    <Tab.Content className="p-0">
                      {productItem?.productImages?.map((image) => {
                        return (
                          <Tab.Pane key={image.id} eventKey={image.id}>
                            <img
                              src={image.file.originalUrl}
                              alt=""
                              style={{ height: "35rem", objectFit: "cover" }}
                              className="img-fluid mx-auto d-block rounded"
                            />
                          </Tab.Pane>
                        );
                      })}
                    </Tab.Content>

                    <Nav variant="pills" as="ul" className="nav nav-justified">
                      {productItem?.productImages?.map((image) => {
                        return (
                          <Nav.Item as="li" key={image.id}>
                            <Nav.Link
                              eventKey={image.id}
                              className="product-thumb cursor-pointer"
                            >
                              <img
                                src={image.file.originalUrl}
                                alt=""
                                style={{
                                  height: "10rem",
                                  width: "10rem",
                                  objectFit: "cover",
                                }}
                                className="img-fluid mx-auto d-block rounded"
                              />
                            </Nav.Link>
                          </Nav.Item>
                        );
                      })}
                    </Nav>
                  </Tab.Container>
                </Col>

                <Col lg={7}>
                  <div className="ps-xl-3 mt-3 mt-xl-0">
                    <Link to="#" className="text-primary">
                      {productItem?.brand}
                    </Link>
                    <h4 className="mb-3"> {productItem?.name}</h4>

                    <h4 className="mb-4">
                      Price :{" "}
                      <b>
                        {productItem.price} {CURRENCY}
                      </b>
                    </h4>

                    <h4>
                      <span className="badge bg-soft-success text-success mb-4">
                        {productItem.quantity} {product.status}
                      </span>
                    </h4>

                    <div className="text-muted mb-4">
                      {Parser(productItem.description)}
                    </div>
                  </div>
                </Col>
              </Row>

              <Stocks />
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </>
  );
};

export default ProductDetails;
