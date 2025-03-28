import React, { FC, useMemo, useRef, useState } from "react";
import { Card, Col, Row } from "react-bootstrap"; // components
import logoDark from "@/assets/images/logo-dark.png";
import logoLight from "@/assets/images/logo-light.png";
import { Drawer } from "antd";
import ProductItem from "@/pages/invoice/component/ProductItem.tsx";
import { CURRENCY } from "@/types/constand.ts";
import { formatToDate } from "@/utils/format.ts";

interface Address {
  line_1: string;
  line_2: string;
  city: string;
  state: string;
  zip: number;
  phone: string;
}

interface IItems {
  id: string;
  quantity: number;
  price: number;
}

interface IProps {
  user: any;
  products: any[];
  isOpen: boolean;
  order: any;
  toggle: () => void;
}
const Invoice: FC<IProps> = ({ user, products, isOpen, toggle, order }) => {
  const printRef = useRef<HTMLDivElement>(null);
  const [customer] = useState<string>("Stanley Jones");
  const [notes] = useState<string>(
    "Thanks a lot because you keep purchasing our products. Our company promises to provide high quality products for you as well as outstanding customer service for every transaction.",
  );

  const [productList, setProductList] = useState<IItems[]>([]);
  const [vat] = useState<string>("$459.75");

  const handleAddProductToInvoice = (newItem: IItems) => {
    setProductList((items) => [...items, newItem]);
  };

  const handlePrint = () => {
    if (!printRef.current) return;

    const printContent = printRef.current.innerHTML;
    const newWindow = window.open("", "_blank");
    if (!newWindow) return;

    newWindow.document.write(`
      <html>
        <head>
          <title>Technoland</title>
          <style>
            body { font-family: Arial, sans-serif; padding: 20px; }
          </style>
        </head>
        <body>
          ${printContent}
        </body>
      </html>
    `);
    newWindow.document.close();
    newWindow.print();
  };

  const calculateTotal = useMemo(() => {
    let total = 0;
    products?.forEach((prod) => {
      total += prod.price
        ? prod?.quantity * prod.price
        : prod?.quantity * prod.product.price;
    });

    return total;
  }, [productList]);

  return (
    <>
      <Drawer
        open={isOpen}
        onClose={toggle}
        destroyOnClose
        width={1200}
        height={500}
      >
        <Row ref={printRef}>
          <Col>
            <Card>
              <Card.Body>
                <div className="clearfix">
                  <div className="float-start">
                    <div className="auth-logo">
                      <div className="logo logo-dark">
                        <span className="logo-lg">
                          <img src={logoDark} alt="" height="22" />
                        </span>
                      </div>
                      <div className="logo logo-light">
                        <span className="logo-lg">
                          <img src={logoLight} alt="" height="22" />
                        </span>
                      </div>
                    </div>
                  </div>
                  <div className="float-end">
                    <h4 className="m-0 d-print-none">Invoice</h4>
                  </div>
                </div>

                <Row>
                  <Col md={6}>
                    <div className="mt-3">
                      <p>
                        <b>Hello, {order?.user?.username}</b>
                      </p>
                      <p className="text-muted">{notes}</p>
                    </div>
                  </Col>

                  <Col md={{ span: 4, offset: 2 }}>
                    <div className="mt-3 float-end">
                      <p>
                        <strong>Order Date : </strong>{" "}
                        <span className="float-end">
                          {" "}
                          &nbsp;&nbsp;&nbsp;{" "}
                          {formatToDate(order?.createAt)}{" "}
                        </span>
                      </p>
                      <p>
                        <strong>Order Status : </strong>{" "}
                        <span className="float-end">
                          {" "}
                          <span className="badge bg-danger">
                            {order?.status}
                          </span>
                        </span>
                      </p>
                      <p>
                        <strong>Order No. : </strong>
                        <span className="float-end">
                          {" "}
                          <span className="float-end">{order?.orderId}</span>
                        </span>
                      </p>
                    </div>
                  </Col>
                </Row>

                <Row>
                  <Col xs={12}>
                    <div className="table-responsive">
                      <table className="table mt-4 table-centered">
                        <thead>
                          <tr>
                            <th>#</th>
                            <th>Item</th>
                            <th style={{ width: "10%" }}>Quantity</th>
                            <th style={{ width: "10%" }}>Price</th>
                            <th style={{ width: "10%" }} className="text-end">
                              Total
                            </th>
                          </tr>
                        </thead>
                        <tbody>
                          {(products || []).map((item, idx) => {
                            return (
                              <ProductItem
                                price={
                                  item?.price
                                    ? item?.price
                                    : item.product?.price
                                }
                                quantity={item.quantity}
                                key={idx}
                                itemNumber={idx}
                                productItem={item}
                              />
                            );
                          })}
                        </tbody>
                      </table>
                    </div>
                  </Col>
                </Row>

                <Row
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    marginTop: "2rem",
                  }}
                >
                  <Col>
                    <div
                      style={{
                        border: "1px solid #000",
                        padding: "20px",
                        width: "100%",
                        maxWidth: "250px",
                        height: "100px",
                        textAlign: "center",
                      }}
                    >
                      <p>
                        <b>Signature:</b>
                      </p>
                      <div
                        style={{
                          width: "100%",
                          height: "60px",
                          borderBottom: "1px solid #000",
                          marginTop: "10px",
                        }}
                      ></div>
                    </div>
                  </Col>

                  <Col>
                    <div>
                      <p>
                        <b>Sub-total:</b> <span>{calculateTotal}</span>
                      </p>
                      <h3>
                        {calculateTotal} {CURRENCY}
                      </h3>
                    </div>
                    <div style={{ clear: "both" }}></div>
                  </Col>
                </Row>
              </Card.Body>
            </Card>
          </Col>
        </Row>
        <div className="mt-4 mb-1">
          <div className="text-end d-print-none">
            <button
              className="btn btn-primary waves-effect waves-light me-1"
              onClick={handlePrint}
            >
              <i className="mdi mdi-printer me-1"></i> Print
            </button>
            <button className="btn btn-info waves-effect waves-light">
              Submit
            </button>
          </div>
        </div>
      </Drawer>
    </>
  );
};

export default Invoice;
