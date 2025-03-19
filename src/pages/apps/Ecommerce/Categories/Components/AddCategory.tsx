import React, { FC } from "react";
import {
  Button,
  Flex,
  Form,
  FormProps,
  Input,
  message,
  Modal,
  Select,
} from "antd";
import { useMutation } from "react-query";
import { createCategory } from "@/service/api/category.ts";
import useCategoryGroups from "@/hooks/queries/useCategoryGroups.ts";

type FieldType = {
  name?: string;
  categoryGroupId?: string;
};

interface IProps {
  isOpen: boolean;
  toggle: () => void;
  refetch: () => void;
}
const AddCategory: FC<IProps> = ({ isOpen, toggle, refetch }) => {
  const [form] = Form.useForm();
  const { data } = useCategoryGroups();

  const { isLoading, mutateAsync } = useMutation(
    async (payload: { name: string; categoryGroupId: string }) =>
      createCategory(payload),
  );

  const onFinish: FormProps<FieldType>["onFinish"] = (values) => {
    console.log("Success:", values);
    mutateAsync(
      {
        name: values.name,
        categoryGroupId: values.categoryGroupId,
      },
      {
        onSuccess: () => {
          message.success("Success!");
          form.resetFields();
          refetch();
          toggle();
        },
        onError: () => {
          message.error("Error!");
        },
      },
    );
  };

  return (
    <Modal
      title={"Add Category"}
      open={isOpen}
      onClose={toggle}
      onCancel={toggle}
      footer={null}
      destroyOnClose={true}
    >
      <Form
        className={"mt-3"}
        name="basic"
        onFinish={onFinish}
        autoComplete="off"
        form={form}
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
          name="categoryGroupId"
          rules={[{ message: "Please select the category group!" }]}
        >
          <Select
            showSearch
            placeholder="Select a category group"
            filterOption={(input, option) =>
              (option?.label ?? "").toLowerCase().includes(input.toLowerCase())
            }
            options={data?.map((item) => {
              return { value: item.id, label: item.name };
            })}
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
