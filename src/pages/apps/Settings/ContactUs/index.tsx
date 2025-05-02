import React from "react";
import PageTitle from "@/components/PageTitle.tsx";
import { useDisclosure } from "@/hooks/useDisclosure.ts";
import CreateContactUs from "@/pages/apps/Settings/ContactUs/components/CreateContactUs.tsx";
import { Card, Col, Row } from "react-bootstrap";
import { Button, Flex, Image, Spin } from "antd";
import useContactUs from "@/hooks/queries/useContactUs.ts";

const ContactUs = () => {
  const { isFetching, data } = useContactUs();
  const { isOpen, toggle } = useDisclosure();

  console.log(data);
  return (
    <Spin spinning={isFetching}>
      <CreateContactUs isOpen={isOpen} toggle={toggle} refetch={() => {}} />
      <PageTitle title={"Contact Us"} />

      <Row>
        <Col>
          <Card>
            <Flex className={"p-2 justify-content-end"}>
              <Button onClick={toggle}>Add</Button>
            </Flex>
          </Card>
        </Col>
      </Row>

      {data?.map((contactUs) => (
        <Col>
          <Card className="product-box">
            <Card.Body>
              <div
                // className={"textSecondary"}
                style={{ marginBottom: "1rem" }}
              >
                <Col>{contactUs?.city}</Col>
                <Col>{contactUs?.address}</Col>
                <Col>{contactUs?.phone1}</Col>
                {contactUs?.phone2 && <Col>{contactUs?.phone2}</Col>}
                <Col>{contactUs?.officeHours}</Col>
              </div>
              <Image
                preview={false}
                src={contactUs?.file?.originalUrl}
                height={250}
                width={300}
                style={{ padding: "10px" }}
              />
            </Card.Body>
          </Card>
        </Col>
      ))}
    </Spin>
  );
};

export default ContactUs;
