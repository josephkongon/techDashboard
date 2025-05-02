// components
import PageTitle from "../../../components/PageTitle";

import CompanyDetails from "./CompanyDetails";

// dummy data
import { companyInfo } from "./data";

const Companies = () => {
  return (
    <>
      <CompanyDetails companyInfo={companyInfo} />
    </>
  );
};

export default Companies;
