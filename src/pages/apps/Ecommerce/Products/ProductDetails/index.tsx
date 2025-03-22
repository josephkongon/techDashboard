import React, { useState } from "react";
import { Link, useParams } from "react-router-dom";
import { Button, Card, Col, Nav, Row, Tab } from "react-bootstrap";
import Parser from "html-react-parser";
import PageTitle from "../../../../../components/PageTitle";
import { BASE_QUERY_OPTIONS, CURRENCY } from "@/types/constand";
import { getProductSpecification } from "@/utils/product.ts";
import { useTranslation } from "react-i18next";
import AddProduct from "@/pages/apps/Ecommerce/Products/Component/AddProduct.tsx";
import { useQuery } from "react-query";
import { getProduct } from "@/service/api/product.ts";
import { Empty, Spin } from "antd";

const ProductDetails = () => {
  const { t } = useTranslation();
  const [product, setProduct] = useState<any | null>();
  const param = useParams();

  const {
    isFetching,
    refetch,
    data: productItem,
  } = useQuery(["get-single-product", param?.id], () => getProduct(param?.id), {
    ...BASE_QUERY_OPTIONS,
  });

  return (
    <Spin spinning={isFetching}>
      <AddProduct
        setProduct={setProduct}
        product={product}
        isOpen={!!product}
        toggle={() => setProduct(null)}
        refetch={refetch}
      />
      <PageTitle title={"Product Detail"} />

      <Row>
        <Col>
          {!isFetching && !productItem ? (
            <Empty description={"No product found."} />
          ) : (
            <Card>
              <Card.Body>
                <div>
                  <div className="text-lg-end my-1 my-lg-0">
                    <Button
                      onClick={() => setProduct(productItem)}
                      className="btn btn-danger waves-effect waves-light"
                    >
                      <i className="mdi mdi-book-edit me-1"></i> Edit Product
                    </Button>
                  </div>
                </div>
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

                      <Nav
                        variant="pills"
                        as="ul"
                        className="nav nav-justified"
                      >
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
                          {productItem?.price} {CURRENCY}
                        </b>
                      </h4>

                      <h4>
                        <span className="badge bg-soft-success text-success mb-4">
                          {productItem?.quantity} in stock
                        </span>
                      </h4>

                      <p style={{ fontSize: "1.2rem", fontWeight: "500" }}>
                        Description
                      </p>
                      <div className="text-muted mb-4">
                        {Parser(productItem?.description || "")}
                      </div>

                      <p style={{ fontSize: "1.2rem", fontWeight: "500" }}>
                        Summary
                      </p>
                      <div className="text-muted mb-4">
                        {Parser(productItem?.summary || "")}
                      </div>
                    </div>
                  </Col>
                </Row>

                <>
                  <div className="table-responsive mt-4">
                    <table className="table table-bordered table-centered mb-0">
                      <thead className="table-light">
                        <tr>
                          <th>Specification</th>
                        </tr>
                      </thead>
                      <tbody>
                        {getProductSpecification(productItem || {}).map(
                          ({ key, value }, index) => {
                            if (key === "colors") {
                              return (
                                <tr key={index}>
                                  <td>{t(key)}</td>
                                  <td>
                                    {value.map((color, index) => {
                                      return (
                                        <span
                                          key={index}
                                          style={{
                                            display: "flex",
                                            alignItems: "center",
                                          }}
                                        >
                                          <span
                                            style={{
                                              backgroundColor:
                                                color.toLowerCase(),
                                              width: 16,
                                              height: 16,
                                              borderRadius: "50%",
                                              display: "inline-block",
                                              marginRight: 8,
                                              border: "1px solid #ccc",
                                            }}
                                          ></span>
                                          {color}
                                        </span>
                                      );
                                    })}
                                  </td>
                                </tr>
                              );
                            }
                            return (
                              <tr key={index}>
                                <td>{t(key)}</td>
                                <td>{value}</td>
                              </tr>
                            );
                          },
                        )}
                      </tbody>
                    </table>
                  </div>
                </>
              </Card.Body>
            </Card>
          )}
        </Col>
      </Row>
    </Spin>
  );
};

export default ProductDetails;
