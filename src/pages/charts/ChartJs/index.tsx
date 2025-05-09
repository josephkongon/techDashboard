import React from "react";
import { Row, Col } from "react-bootstrap";

// components
import PageTitle from "../../../components/PageTitle";

import LineChart from "./LineChart";
import BarChart from "./BarChart";
import DonutChart from "./DonutChart";
import RadarChart from "./RadarChart";
import PolarChart from "./PolarChart";
import BubbleChart from "./BubbleChart";

import "chart.js/auto";

const ChartJs = () => {
  return (
    <React.Fragment>
      <Row>
        <Col xl={6}>
          <LineChart />
        </Col>

        <Col xl={6}>
          <BarChart />
        </Col>
      </Row>

      <Row>
        <Col xl={6}>
          <DonutChart />
        </Col>

        <Col xl={6}>
          <RadarChart />
        </Col>
      </Row>
      <Row>
        <Col xl={6}>
          <PolarChart />
        </Col>
        <Col xl={6}>
          <BubbleChart />
        </Col>
      </Row>
    </React.Fragment>
  );
};

export default ChartJs;
