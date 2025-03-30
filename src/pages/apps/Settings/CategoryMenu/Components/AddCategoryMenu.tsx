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
import { useMutation, useQuery } from "react-query";
import { getCategoryGroup } from "@/service/api/categoryGroup.ts";
import { BASE_QUERY_OPTIONS } from "@/types/constand.ts";
import {
  createCategoryMenu,
  updateCategoryMenu,
} from "@/service/api/categoryMenu.ts";

type FieldType = {
  name?: string;
  categoryGroupIds?: string[];
};

interface IProps {
  isOpen: boolean;
  toggle: () => void;
  refetch?: () => void;
  setCategoryMenu: (value: any) => void;
  categoryMenu?: any;
}
const AddCategoryMenu: FC<IProps> = ({
  isOpen,
  toggle,
  refetch,
  categoryMenu,
  setCategoryMenu,
}) => {
  const [form] = Form.useForm();
  const { isFetching, data: resData } = useQuery(
    ["category-groups"],
    async () => getCategoryGroup(),
    {
      ...BASE_QUERY_OPTIONS,
    },
  );

  const { isLoading, mutateAsync } = useMutation(
    async (payload: { name: string; categoryGroupId: string[] }) =>
      createCategoryMenu({ payload }),
  );

  const { isLoading: loadingUpdate, mutateAsync: mutateUpdate } = useMutation(
    async (payload: any) =>
      updateCategoryMenu({ id: categoryMenu.id, payload }),
  );

  const onFinish: FormProps<FieldType>["onFinish"] = (values) => {
    if (!categoryMenu) {
      mutateAsync(
        {
          name: values.name,
          categoryGroupIds: values.categoryGroupIds,
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
      console.log({ values });
      mutateUpdate(values, {
        onSuccess: () => {
          message.success("Success!");
          form.resetFields();
          refetch();
          setCategoryMenu(null);
        },
        onError: () => {
          message.error("Error!");
        },
      });
    }
  };

  useEffect(() => {
    if (categoryMenu) {
      form.setFieldValue("name", categoryMenu.name);
      form.setFieldValue(
        "categoryGroupIds",
        categoryMenu.categoryGroups
          ? categoryMenu.categoryGroups.map((item) => item?.id)
          : [],
      );
    }
  }, [categoryMenu]);

  return (
    <Modal
      title={categoryMenu ? "Edit Category Menu" : "Add Category Menu"}
      open={isOpen || !!categoryMenu}
      onClose={() => {
        if (categoryMenu) {
          form.resetFields();
          setCategoryMenu(null);
        } else {
          form.resetFields();
          toggle();
        }
      }}
      onCancel={() => {
        if (categoryMenu) {
          form.resetFields();
          setCategoryMenu(null);
        } else {
          form.resetFields();
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
          label="Category Groups"
          name="categoryGroupIds"
          rules={[
            {
              required: true,
              message: "Please select the category group!",
              type: "array",
            },
          ]}
        >
          <Select
            mode="multiple"
            loading={isFetching}
            showSearch
            placeholder="Select a category group"
            filterOption={(input, option) =>
              (option?.label ?? "").toLowerCase().includes(input.toLowerCase())
            }
            options={resData?.data?.map((item) => {
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
              {categoryMenu ? "Update Category Menu" : "Add Category Menu"}
            </Button>
          </Form.Item>
        </Flex>
      </Form>
    </Modal>
  );
};

export default AddCategoryMenu;
