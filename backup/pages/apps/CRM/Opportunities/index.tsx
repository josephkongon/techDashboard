import { Row, Col } from "react-bootstrap";

// components
import PageTitle from "../../../../components/PageTitle";

import CompanyDetails from "./CompanyDetails";
import StatusChart from "./StatusChart";

// dummy data
import { companyInfo } from "./data";

const Opportunities = () => {
  return (
    <>
      <Row>
        <Col xl={{ span: 8, order: 1 }} xs={{ span: 12, order: 2 }}>
          <CompanyDetails companyInfo={companyInfo} />
        </Col>
        <Col xl={{ span: 4, order: 2 }} xs={{ span: 12, order: 1 }}>
          <StatusChart />
        </Col>
      </Row>
    </>
  );
};

export default Opportunities;
