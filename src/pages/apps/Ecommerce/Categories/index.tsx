import { Card, Col, Row } from "react-bootstrap";
import { Button, Input } from "antd";
//dummy data
import PageTitle from "@/components/PageTitle.tsx";
import { useDisclosure } from "@/hooks/useDisclosure.ts";
import AddCategory from "@/pages/apps/Ecommerce/Categories/Components/AddCategory.tsx";
import useCategory from "@/hooks/queries/useCategory.ts";
import CategoryTable from "@/pages/apps/Ecommerce/Categories/Components/CategoryTable.tsx";
import React, { useState } from "react";

const { Search } = Input;

const Categories = () => {
  const { isOpen, toggle } = useDisclosure();
  const [category, setCategory] = useState<any>();

  const { data, isFetching, refetch, setSearchValue } = useCategory();
  const onSearch = (value, _e) => {
    _e.preventDefault();
    setSearchValue(value);
  };

  return (
    <>
      <AddCategory
        category={category}
        setCategory={setCategory}
        isOpen={isOpen}
        toggle={toggle}
        refetch={refetch}
      />
      <PageTitle title={"Categories"} />

      <Row>
        <Col>
          <Card>
            <Card.Body>
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
                <Col className="col-auto">
                  <Button onClick={toggle}>Add</Button>
                </Col>
              </Row>
            </Card.Body>
          </Card>
        </Col>
      </Row>
      <CategoryTable
        setCategory={setCategory}
        data={data}
        isFetching={isFetching}
      />
    </>
  );
};

export default Categories;
