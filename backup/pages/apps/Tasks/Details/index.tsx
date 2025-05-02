import React, { useState } from "react";
import { Row, Col } from "react-bootstrap";

// components
import PageTitle from "../../../../components/PageTitle";

import Task from "./Task";
import Comments from "./Comments";
import Attachments from "./Attachments";

// dummy data
import { Tasks, TaskItems } from "./data";

// TaskDetails
const TaskDetails = () => {
  const [selectedTask] = useState<TaskItems>(Tasks[0]);

  return (
    <>
      <Row>
        <Col xl={8} lg={7}>
          <Task task={selectedTask} />
          <Comments />
        </Col>
        <Col xl={4} lg={5}>
          <Attachments />
        </Col>
      </Row>
    </>
  );
};

export default TaskDetails;
