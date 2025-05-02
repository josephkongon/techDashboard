import classNames from "classnames";
import { Card, Col, Row } from "react-bootstrap";

// components
import PageTitle from "../../../components/PageTitle";

// icon data
import { FEATHERICONLIST } from "./data";

const FeatherIcons = () => {
  return (
    <>
      <Row>
        <Col>
          <Card>
            <Card.Body>
              <Row className="icons-list-demo">
                {(FEATHERICONLIST || []).map((icon, index) => {
                  return (
                    <Col key={index} sm={6} md={4} lg={3}>
                      <i className={classNames(icon.name)}></i>{" "}
                      <span>{icon.name}</span>
                    </Col>
                  );
                })}
              </Row>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </>
  );
};

export default FeatherIcons;
