import { Card, Col, Row } from "react-bootstrap";
import { Button, Flex } from "antd";
//dummy data
import PageTitle from "@/components/PageTitle.tsx";
import { useDisclosure } from "@/hooks/useDisclosure.ts";
import AddCategory from "@/pages/apps/Ecommerce/Categories/Components/AddCategory.tsx";
import useCategory from "@/hooks/queries/useCategory.ts";
import CategoryTable from "@/pages/apps/Ecommerce/Categories/Components/CategoryTable.tsx";

const Categories = () => {
  const { isOpen, toggle } = useDisclosure();

  const { data, isFetching, refetch } = useCategory();

  return (
    <>
      <AddCategory isOpen={isOpen} toggle={toggle} refetch={refetch} />
      <PageTitle title={"Categories"} />

      <Row>
        <Col>
          <Card>
            <Flex className={"p-2 justify-content-end"}>
              <Button onClick={toggle}>Add</Button>
            </Flex>
          </Card>
        </Col>
      </Row>
      <CategoryTable data={data} isFetching={isFetching} />
    </>
  );
};

export default Categories;
