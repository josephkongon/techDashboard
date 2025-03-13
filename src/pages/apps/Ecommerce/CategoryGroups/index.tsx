import { Card, Col, Row } from "react-bootstrap";
import { Button, Flex, Table } from "antd";
//dummy data
import PageTitle from "@/components/PageTitle.tsx";
import { useDisclosure } from "@/hooks/useDisclosure.ts";
import AddGroup from "@/pages/apps/Ecommerce/CategoryGroups/Components/AddGroup.tsx";

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

const data = [
  {
    id: "5",
    name: "test",
    age: 25,
    company: "Test company",
  },
];

const CategoriesGroups = () => {
  const { isOpen, toggle } = useDisclosure();
  return (
    <>
      <AddGroup isOpen={isOpen} toggle={toggle} />
      <PageTitle title={"Categories Groups"} />

      <Row>
        <Col>
          <Card>
            <Flex className={"p-2 justify-content-end"}>
              <Button onClick={toggle}>Add</Button>
            </Flex>
            <Card.Body>
              <Table columns={columns} dataSource={data} />
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </>
  );
};

export default CategoriesGroups;
