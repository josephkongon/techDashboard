import React, { useState } from "react";
import PageTitle from "@/components/PageTitle.tsx";
import { Button, Card, Col, Row } from "react-bootstrap";
import { Flex } from "antd";
import AddCategoryMenu from "@/pages/apps/Settings/CategoryMenu/Components/AddCategoryMenu.tsx";
import { useDisclosure } from "@/hooks/useDisclosure.ts";
import MenuTable from "@/pages/apps/Settings/CategoryMenu/Components/MenuTable.tsx";
import { useQuery } from "react-query";
import { getCategoryMenu } from "@/service/api/categoryMenu.ts";
import { BASE_QUERY_OPTIONS } from "@/types/constand.ts";

const CategoryMenu = () => {
  const { isOpen, toggle } = useDisclosure();
  const [categoryMenu, setCategoryMenu] = useState<any>();

  const { isFetching, data, refetch } = useQuery(
    ["get-category-menu"],
    getCategoryMenu,
    {
      ...BASE_QUERY_OPTIONS,
    },
  );

  return (
    <>
      <AddCategoryMenu
        categoryMenu={categoryMenu}
        isOpen={isOpen}
        toggle={toggle}
        refetch={refetch}
        setCategoryMenu={setCategoryMenu}
      />
      <PageTitle title={"Category Menu"} />

      <Row>
        <Col>
          <Card>
            <Flex className={"p-2 justify-content-end"}>
              <Button onClick={toggle}>Add</Button>
            </Flex>
          </Card>
        </Col>
      </Row>
      <Col>
        <MenuTable
          setCategoryMenu={setCategoryMenu}
          data={data?.data}
          isFetching={isFetching}
        />
      </Col>
    </>
  );
};

export default CategoryMenu;
