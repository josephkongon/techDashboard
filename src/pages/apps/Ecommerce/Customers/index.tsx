import React, { useState } from "react";
import { Card, Col, Row } from "react-bootstrap";
import { Button, Flex, Input, Spin } from "antd";

import PageTitle from "../../../../components/PageTitle";
import CreateUser from "@/pages/apps/Ecommerce/Customers/Componets/CreateUser.tsx";
import { useDisclosure } from "@/hooks/useDisclosure.ts";
import useUsers from "@/hooks/queries/useUsers.ts";
import UserTable from "@/pages/apps/Ecommerce/Customers/Componets/UserTable.tsx";
import { useIsMobile } from "@/hooks/useMediaQuery.ts";
import PaginatedVirtualizedList from "@/components/PaginatedList";
import CreateOrder from "@/pages/apps/Ecommerce/Orders/Components/CreateOrder.tsx";

const { Search } = Input;

const Customers = () => {
  const { isOpen, toggle } = useDisclosure();
  const { isOpen: openCreateOrder, toggle: toggleCreateOrder } =
    useDisclosure();
  const [user, setUser] = useState<any>();
  const [userOrder, setUserOrder] = useState<any>();

  const { isFetching, data, refetch, setSearchValue } = useUsers();
  const isMobile = useIsMobile();

  const onSearch = (value, _e) => {
    _e.preventDefault();
    setSearchValue(value);
  };

  return (
    <Spin spinning={isFetching}>
      <CreateUser
        user={user}
        isOpen={isOpen}
        toggle={toggle}
        refetch={refetch}
        setUser={setUser}
      />

      <CreateOrder
        userId={userOrder?.id}
        username={userOrder?.username}
        isOpen={openCreateOrder}
        toggle={toggleCreateOrder}
        setUserOrder={setUserOrder}
      />

      <PageTitle title={"Customers"} />

      <Row>
        <Col>
          <Card>
            {/*<Card.Body>*/}
            <Row className="justify-content-between">
              <Col className="col-auto">
                <form className="d-flex flex-wrap align-items-center">
                  <Search
                    placeholder="input search text"
                    onSearch={onSearch}
                    enterButton
                  />
                </form>
              </Col>
              <Col className={"col-auto"}>
                <Button onClick={toggle} className="btn btn-danger my-2 ">
                  <i className="mdi mdi-plus-circle me-2"></i> Add Customer
                </Button>
              </Col>
            </Row>
            {/*</Card.Body>*/}
          </Card>
        </Col>
      </Row>

      {isMobile ? (
        <>
          <PaginatedVirtualizedList
            data={data || []}
            itemsPerPage={30}
            height={700}
            RenderComponent={({ item }) => {
              return (
                <Col md={6} xl={3} key={item.id}>
                  <Card className="product-box">
                    <Card.Body>
                      <Flex
                        className={
                          "align-items-center justify-content-sm-between"
                        }
                      >
                        <div className="col">
                          <h5 className="font-16 mt-0 sp-line-1">
                            <div className="text-dark">
                              Name: {item.username}
                            </div>
                          </h5>

                          <h5 className="font-16 mt-0 sp-line-1">
                            <div className="text-dark">Email: {item.email}</div>
                          </h5>
                          <h5 className="font-16 mt-0 sp-line-1">
                            <div className="text-dark">Phone: {item.phone}</div>
                          </h5>
                        </div>
                        <Flex style={{ flexDirection: "column", gap: 5 }}>
                          <Button variant={"solid"}>Create order</Button>
                          <Button
                            variant={"outlined"}
                            onClick={() => {
                              setUser(item);
                            }}
                          >
                            Edit
                          </Button>
                        </Flex>
                      </Flex>
                    </Card.Body>
                  </Card>
                </Col>
              );
            }}
          />
        </>
      ) : (
        <UserTable
          toggleCreateOrder={toggleCreateOrder}
          setUserOrder={setUserOrder}
          setUser={setUser}
          data={data}
          isFetching={isFetching}
        />
      )}
    </Spin>
  );
};

export default Customers;
