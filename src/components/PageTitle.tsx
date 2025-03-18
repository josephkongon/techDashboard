import { Breadcrumb, Col, Row } from "react-bootstrap";

interface BreadcrumbItems {
  label: string;
  path: string;
  active?: boolean;
}

interface PageTitleProps {
  title: string;
  breadcrumbItems?: BreadcrumbItems[];
}

/**
 * PageTitle
 */
const PageTitle = (props: PageTitleProps) => {
  return (
    <Row>
      <Col>
        <div className="page-title-box">
          <h4 className="page-title">{props["title"]}</h4>
        </div>
      </Col>
      {props.breadcrumbItems && (
        <Breadcrumb className={"breadcrumb-item"}>
          {props.breadcrumbItems.map(({ label, path, active }) => (
            <Breadcrumb.Item active={active} href={path} key={path}>
              {label}
            </Breadcrumb.Item>
          ))}
        </Breadcrumb>
      )}
    </Row>
  );
};

export default PageTitle;
