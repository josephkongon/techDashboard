import { Card, Col, Row } from "react-bootstrap";
import { Button, Flex } from "antd";
//dummy data
import PageTitle from "@/components/PageTitle.tsx";
import { useDisclosure } from "@/hooks/useDisclosure.ts";
import AddGroup from "@/pages/apps/Ecommerce/CategoryGroups/Components/AddGroup.tsx";
import useCategoryGroups from "@/hooks/queries/useCategoryGroups.ts";
import CategoryGroupTable from "@/pages/apps/Ecommerce/CategoryGroups/Components/CategoryGroupTable.tsx";

const columns = [
  {
    title: "ID",
    dataIndex: "id",
    key: "id",
    sort: true,
  },
  {
    title: "Name",
    dataIndex: "name",
    key: "name",
    sort: true,
  },
  {
    title: "Phone Number",
    dataIndex: "phone",
    key: "phone",
    sort: false,
  },
  {
    title: "Age",
    dataIndex: "age",
    key: "age",
    sort: true,
  },
  {
    title: "Company",
    dataIndex: "company",
    key: "company",
    sort: false,
  },
];

const CategoriesGroups = () => {
  const { isOpen, toggle } = useDisclosure();

  const { data, isFetching, refetch } = useCategoryGroups();

  return (
    <>
      <AddGroup isOpen={isOpen} toggle={toggle} refetch={refetch} />
      <PageTitle title={"Categories Groups"} />

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
        <Card>
          <CategoryGroupTable data={data} isFetching={isFetching} />
        </Card>
      </Col>
    </>
  );
};

export default CategoriesGroups;
