import React, { useMemo, useRef, useState } from "react";
import { Card, Col, Row } from "react-bootstrap"; // components
import logoDark from "@/assets/images/logo-dark.png";
import logoLight from "@/assets/images/logo-light.png";
import { Button, Drawer } from "antd";
import AddProductToInvoice from "@/pages/invoice/AddProductToInvoice.tsx";
import { useDisclosure } from "@/hooks/useDisclosure.ts";
import ProductItem from "@/pages/invoice/component/ProductItem.tsx";
import { CURRENCY } from "@/types/constand.ts";

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
}
const Invoice = () => {
  const { isOpen, toggle } = useDisclosure();
  const printRef = useRef<HTMLDivElement>(null);
  const [customer] = useState<string>("Stanley Jones");
  const [notes] = useState<string>(
    "Thanks a lot because you keep purchasing our products. Our company promises to provide high quality products for you as well as outstanding customer service for every transaction.",
  );
  const [order_date] = useState<string>("Jan 17, 2016");
  const [order_status] = useState<string>("Unpaid");
  const [order_no] = useState<string>("000028");
  const [billing_address] = useState<Address>({
    line_1: "Stanley Jones",
    line_2: "795 Folsom Ave, Suite 600",
    city: "San Francisco",
    state: "CA",
    zip: 94107,
    phone: "(123) 456-7890",
  });
  const [shipping_address] = useState<Address>({
    line_1: "Stanley Jones",
    line_2: "795 Folsom Ave, Suite 600",
    city: "San Francisco",
    state: "CA",
    zip: 94107,
    phone: "(123) 456-7890",
  });

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
    productList.forEach((prod) => {
      total += prod?.quantity * prod.price;
    });

    return total;
  }, [productList]);

  return (
    <>
      <AddProductToInvoice
        toggle={toggle}
        isOpen={isOpen}
        update={handleAddProductToInvoice}
      />

      <Drawer width={1200} height={500}>
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
                        <b>Hello, {customer}</b>
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
                          &nbsp;&nbsp;&nbsp; {order_date}{" "}
                        </span>
                      </p>
                      <p>
                        <strong>Order Status : </strong>{" "}
                        <span className="float-end">
                          {" "}
                          <span className="badge bg-danger">
                            {order_status}
                          </span>
                        </span>
                      </p>
                      <p>
                        <strong>Order No. : </strong>
                        <span className="float-end">
                          {" "}
                          <span className="float-end">{order_no}</span>
                        </span>
                      </p>
                    </div>
                  </Col>
                </Row>

                <Row className="mt-3">
                  <Col sm={6}>
                    <h6>Billing Address</h6>
                    <address>
                      {billing_address.line_1}
                      <br />
                      {billing_address.line_2}
                      <br />
                      {billing_address.city}, {billing_address.state}{" "}
                      {billing_address.zip}
                      <br />
                      <abbr title="Phone">P:</abbr> {billing_address.phone}
                    </address>
                  </Col>
                  <Col sm={6}>
                    <h6>Shipping Address</h6>
                    <address>
                      {shipping_address.line_1}
                      <br />
                      {shipping_address.line_2}
                      <br />
                      {shipping_address.city}, {shipping_address.state}{" "}
                      {shipping_address.zip}
                      <br />
                      <abbr title="Phone">P:</abbr> {shipping_address.phone}
                    </address>
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
                          {(productList || []).map((item, idx) => {
                            return (
                              <ProductItem
                                id={item.id}
                                quantity={item.quantity}
                                key={idx}
                                itemNumber={idx}
                                setProductList={setProductList}
                              />
                            );
                          })}
                        </tbody>
                      </table>
                    </div>
                  </Col>
                </Row>

                <Button onClick={toggle}>+</Button>

                <Row>
                  <Col sm={6}>
                    <div className="clearfix pt-5">
                      <h6 className="text-muted">Notes:</h6>
                      <small className="text-muted">
                        All accounts are to be paid within 7 days from receipt
                        of invoice. To be paid by cheque or credit card or
                        direct payment online. If account is not paid within 7
                        days the credits details supplied as confirmation of
                        work undertaken will be charged the agreed quoted fee
                        noted above.
                      </small>
                    </div>
                  </Col>
                  <Col sm={6}>
                    <div className="float-end">
                      <p>
                        <b>Sub-total:</b>{" "}
                        <span className="float-end">{calculateTotal}</span>
                      </p>
                      <p>
                        <b>Discount (10%):</b>{" "}
                        <span className="float-end">
                          {" "}
                          &nbsp;&nbsp;&nbsp; {vat}
                        </span>
                      </p>
                      <h3>
                        {calculateTotal} {CURRENCY}
                      </h3>
                    </div>
                    <div className="clearfix"></div>
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
