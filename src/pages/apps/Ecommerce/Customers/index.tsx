import React, { useState } from "react";
import { Button, Card, Col, Row } from "react-bootstrap";

// components
import PageTitle from "../../../../components/PageTitle";
import CreateUser from "@/pages/apps/Ecommerce/Customers/Componets/CreateUser.tsx";
import { useDisclosure } from "@/hooks/useDisclosure.ts";
import useUsers from "@/hooks/queries/useUsers.ts";
import { Spin } from "antd";
import UserTable from "@/pages/apps/Ecommerce/Customers/Componets/UserTable.tsx";

// dummy data

// main component
const Customers = () => {
  const { isOpen, toggle } = useDisclosure();
  const [user, setUser] = useState<any>();
  const { isFetching, data, refetch } = useUsers();

  return (
    <Spin spinning={isFetching}>
      <CreateUser
        user={user}
        isOpen={isOpen}
        toggle={toggle}
        refetch={refetch}
        setUser={setUser}
      />
      <PageTitle title={"Customers"} />

      <Row>
        <Col>
          <Card>
            <div className={"d-flex align-items-center justify-content-end"}>
              <Button onClick={toggle} className="btn btn-danger my-2 ">
                <i className="mdi mdi-plus-circle me-2"></i> Add Customer
              </Button>
            </div>
          </Card>
        </Col>
      </Row>

      <UserTable setUser={setUser} data={data} isFetching={isFetching} />
    </Spin>
  );
};

export default Customers;
