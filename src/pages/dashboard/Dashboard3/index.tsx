import { Row, Col } from "react-bootstrap";

// components
import PageTitle from "../../../components/PageTitle";
import Messages from "../../../components/Messages";
import TodoList from "../../../components/TodoList";
import ChatList from "../../../components/ChatList";

import Statistics from "./Statistics";
import PerformanceChart from "./PerformanceChart";
import RevenueChart from "./RevenueChart";

// dummy data
import { chatMessages } from "./data";

import "chart.js/auto";

const Dashboard3 = () => {
  return (
    <>
      <Statistics />
      <Row>
        <Col xl={6}>
          <RevenueChart />
        </Col>
        <Col xl={6}>
          <PerformanceChart />
        </Col>
      </Row>
      <Row>
        <Col lg={6} xl={4}>
          <Messages />
        </Col>
        <Col lg={6} xl={4}>
          <TodoList addTodo={true} height={"310px"} />
        </Col>
        <Col lg={12} xl={4}>
          <ChatList messages={chatMessages} />
        </Col>
      </Row>
    </>
  );
};

export default Dashboard3;
