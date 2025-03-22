import React, { FC, useEffect } from "react";
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
import { createCategory, updateCategory } from "@/service/api/category.ts";
import useCategoryGroups from "@/hooks/queries/useCategoryGroups.ts";

type FieldType = {
  name?: string;
  categoryGroupId?: string;
};

interface IProps {
  isOpen: boolean;
  toggle: () => void;
  refetch: () => void;
  setCategory: (value: any) => void;
  category?: any;
}
const AddCategory: FC<IProps> = ({
  isOpen,
  toggle,
  refetch,
  category,
  setCategory,
}) => {
  const [form] = Form.useForm();
  const { data } = useCategoryGroups();

  const { isLoading, mutateAsync } = useMutation(
    async (payload: { name: string; categoryGroupId: string }) =>
      createCategory(payload),
  );

  const { isLoading: loadingUpdate, mutateAsync: mutateUpdate } = useMutation(
    async (payload: any) => updateCategory(category.id, payload),
  );

  const onFinish: FormProps<FieldType>["onFinish"] = (values) => {
    if (!category) {
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
    } else {
      mutateUpdate(values, {
        onSuccess: () => {
          message.success("Success!");
          form.resetFields();
          refetch();
          setCategory(null);
        },
        onError: () => {
          message.error("Error!");
        },
      });
    }
  };

  useEffect(() => {
    if (category) {
      form.setFieldValue("name", category.name);
      form.setFieldValue("categoryGroupId", category.categoryGroupId);
    }
  }, [category]);

  return (
    <Modal
      title={category ? "Edit Category" : "Add Category"}
      open={isOpen || !!category}
      onClose={() => {
        if (category) {
          setCategory(null);
        } else {
          toggle();
        }
      }}
      onCancel={() => {
        if (category) {
          setCategory(null);
        } else {
          toggle();
        }
      }}
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
            <Button
              type="primary"
              htmlType="submit"
              loading={loadingUpdate || isLoading}
            >
              {category ? "Update Category" : "Add Category"}
            </Button>
          </Form.Item>
        </Flex>
      </Form>
    </Modal>
  );
};

export default AddCategory;
