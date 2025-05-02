import { Row, Col } from "react-bootstrap";

// components
import PageTitle from "../../../../components/PageTitle";

import CompanyDetails from "./CompanyDetails";
import StaticsChart from "./StaticsChart";

// dummy data
import { companyInfo } from "./data";

const Leads = () => {
  return (
    <>
      <Row>
        <Col lg={{ span: 8, order: 1 }} xs={{ span: 12, order: 2 }}>
          <CompanyDetails companyInfo={companyInfo} />
        </Col>
        <Col lg={{ span: 4, order: 2 }} xs={{ span: 12, order: 1 }}>
          <StaticsChart />
        </Col>
      </Row>
    </>
  );
};

export default Leads;
