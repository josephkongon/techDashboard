import React from "react";
import { Button, Card, Col, Row } from "react-bootstrap";

import PageTitle from "../../../../components/PageTitle.tsx";
import AddProduct from "@/pages/apps/Ecommerce/Products/Component/AddProduct.tsx";
import { useDisclosure } from "@/hooks/useDisclosure.ts";
import { useIsMobile } from "@/hooks/useMediaQuery.ts";
import ProductTable from "@/pages/apps/Ecommerce/Products/Component/ProductTable.tsx";
import useProducts from "@/hooks/queries/useProducts.ts";
import PaginatedVirtualizedList from "@/components/PaginatedList";
import { Link, useNavigate } from "react-router-dom";
import { CURRENCY } from "@/types/constand.ts";
import FilterProvider from "@/providers/FilterProvider.tsx";
import { Input } from "antd";

const { Search } = Input;

const Products = () => {
  const { productData, refetch, isFetching, setSearchValue, handlePageChange } =
    useProducts();
  const { isOpen, toggle } = useDisclosure();
  const isMobile = useIsMobile();
  const navigate = useNavigate();

  const onSearch = (value, _e) => {
    _e.preventDefault();
    setSearchValue(value);
  };

  console.log({ productData });

  return (
    <FilterProvider name={"products"}>
      <AddProduct isOpen={isOpen} toggle={toggle} refetch={refetch} />
      <PageTitle title={"Products"} />

      <Row>
        <Col>
          <Card>
            <Card.Body>
              <Row className="justify-content-between align-items-center">
                <Col className="col-auto">
                  <form className="d-flex flex-wrap align-items-center">
                    <Search
                      placeholder="input search text"
                      onSearch={onSearch}
                      enterButton
                    />
                  </form>
                </Col>

                <Col className="col-auto">
                  <div>
                    <Button
                      onClick={toggle}
                      className="btn btn-danger waves-effect waves-light"
                    >
                      <i className="mdi mdi-plus-circle me-1"></i> Add New
                    </Button>
                  </div>
                </Col>
              </Row>
            </Card.Body>
          </Card>
        </Col>
      </Row>

      {isMobile ? (
        <>
          <PaginatedVirtualizedList
            data={productData.products || []}
            pagination={{
              current: productData.page,
              pageSize: productData.totalPages,
              total: productData.total + 2,
            }}
            handlePageChange={handlePageChange}
            itemsPerPage={100}
            height={700}
            RenderComponent={({ item }) => {
              return (
                <Col md={6} xl={3}>
                  <Card className="product-box">
                    <Card.Body
                      onClick={() => {
                        navigate(`${item.id}`);
                      }}
                    >
                      <div className="bg-light">
                        <img
                          style={{
                            height: "20rem",
                            width: "100%",
                            objectFit: "cover",
                          }}
                          src={item.productImages?.[0]?.file?.originalUrl}
                          alt=""
                          className="img-fluid"
                        />
                      </div>

                      <div className="product-info">
                        <div className="row align-items-center">
                          <div className="col">
                            <h5 className="font-16 mt-0 sp-line-1">
                              <Link
                                to="/apps/ecommerce/product-details"
                                className="text-dark"
                              >
                                {item.name}
                              </Link>
                            </h5>

                            <h5 className="m-0">
                              {" "}
                              <span className="text-muted">
                                {" "}
                                Stocks : {item.quantity} pcs
                              </span>
                            </h5>
                          </div>
                          <div className="col-auto">
                            <div className="product-price-tag">
                              {CURRENCY}
                              {item.price}
                            </div>
                          </div>
                        </div>
                      </div>
                    </Card.Body>
                  </Card>
                </Col>
              );
            }}
          />
        </>
      ) : (
        <ProductTable
          pagination={{
            current: productData.page,
            pageSize: productData.total,
            total: productData.totalPages,
          }}
          products={productData.products}
          isFetching={isFetching}
          handlePageChange={handlePageChange}
        />
      )}
    </FilterProvider>
  );
};

export default Products;
