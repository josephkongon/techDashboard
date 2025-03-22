import { Card, Col, Row } from "react-bootstrap";
import { Button, Flex } from "antd";
//dummy data
import PageTitle from "@/components/PageTitle.tsx";
import { useDisclosure } from "@/hooks/useDisclosure.ts";
import AddGroup from "@/pages/apps/Ecommerce/CategoryGroups/Components/AddGroup.tsx";
import useCategoryGroups from "@/hooks/queries/useCategoryGroups.ts";
import CategoryGroupTable from "@/pages/apps/Ecommerce/CategoryGroups/Components/CategoryGroupTable.tsx";
import { useState } from "react";
import { CategoryGroup } from "@/types/categoryGroup.ts";

const CategoriesGroups = () => {
  const { isOpen, toggle } = useDisclosure();

  const { data, isFetching, refetch } = useCategoryGroups();

  const [group, setGroup] = useState<CategoryGroup | null>();

  return (
    <>
      <AddGroup
        group={group}
        isOpen={isOpen}
        toggle={toggle}
        refetch={refetch}
        setGroup={setGroup}
      />
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
          <CategoryGroupTable
            setGroup={setGroup}
            data={data}
            isFetching={isFetching}
          />
        </Card>
      </Col>
    </>
  );
};

export default CategoriesGroups;
