import React, { FC } from "react";
import { Button, Flex, Form, FormProps, Input, Modal, Select } from "antd";

type FieldType = {
  name?: string;
  groupId?: string;
};

interface IProps {
  isOpen: boolean;
  toggle: () => void;
}
const AddCategory: FC<IProps> = ({ isOpen, toggle }) => {
  const onFinish: FormProps<FieldType>["onFinish"] = (values) => {
    console.log("Success:", values);
  };

  return (
    <Modal
      title={"Add Category"}
      open={isOpen}
      onClose={toggle}
      onCancel={toggle}
      footer={null}
    >
      <Form
        className={"mt-3"}
        name="basic"
        onFinish={onFinish}
        autoComplete="off"
      >
        <Form.Item<FieldType>
          label="Name"
          name="name"
          rules={[
            { required: true, message: "Please enter the Category Name!" },
          ]}
        >
          <Input />
        </Form.Item>

        <Form.Item<FieldType>
          label="Category Group"
          name="groupId"
          rules={[{ message: "Please select the category group!" }]}
        >
          <Select
            showSearch
            placeholder="Select a category group"
            filterOption={(input, option) =>
              (option?.label ?? "").toLowerCase().includes(input.toLowerCase())
            }
            options={[
              { value: "1", label: "Jack" },
              { value: "2", label: "Lucy" },
              { value: "3", label: "Tom" },
            ]}
          />
        </Form.Item>
        <Flex className={"justify-content-end"}>
          <Form.Item label={null}>
            <Button type="primary" htmlType="submit">
              Add
            </Button>
          </Form.Item>
        </Flex>
      </Form>
    </Modal>
  );
};

export default AddCategory;
