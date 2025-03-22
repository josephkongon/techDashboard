import React, { FC, useEffect } from "react";
import { Button, Flex, Form, FormProps, Input, message, Modal } from "antd";
import { useMutation } from "react-query";
import { createUser, updateUser } from "@/service/api/users.ts";

interface IProps {
  isOpen: boolean;
  toggle: () => void;
  refetch: () => void;
  setUser: (value: any) => void;
  user?: any;
}
const CreateUser: FC<IProps> = ({ isOpen, toggle, refetch, user, setUser }) => {
  const [form] = Form.useForm();

  const { isLoading, mutateAsync } = useMutation(async (payload: any) =>
    createUser(payload),
  );

  const { isLoading: loadingUpdate, mutateAsync: mutateUpdate } = useMutation(
    async (payload: any) => updateUser(user.id, payload),
  );

  const onFinish: FormProps["onFinish"] = (values) => {
    if (!user) {
      mutateAsync(values, {
        onSuccess: () => {
          message.success("Success!");
          form.resetFields();
          refetch();
          toggle();
        },
        onError: () => {
          message.error("Error!");
        },
      });
    } else {
      mutateUpdate(values, {
        onSuccess: () => {
          message.success("Success!");
          form.resetFields();
          refetch();
          setUser(null);
        },
        onError: () => {
          message.error("Error!");
        },
      });
    }
  };

  useEffect(() => {
    if (user) {
      form.setFieldValue("username", user.username);
      form.setFieldValue("email", user.email);
      form.setFieldValue("phone", user.phone);
    }
  }, [user]);

  return (
    <Modal
      title={user ? "Edit User" : "Add User"}
      open={isOpen || !!user}
      onClose={() => {
        if (user) {
          setUser(null);
        } else {
          toggle();
        }
      }}
      onCancel={() => {
        if (user) {
          setUser(null);
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
        <Form.Item
          label="Name"
          name="username"
          rules={[{ required: true, message: "Please enter user's name" }]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="Email"
          name="email"
          rules={[
            { required: true, message: "Please enter user's Email" },
            { type: "email" },
          ]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="Phone Number"
          name="phone"
          rules={[
            { required: true, message: "Please enter user's Phone number" },
          ]}
        >
          <Input />
        </Form.Item>

        <Flex className={"justify-content-end"}>
          <Form.Item label={null}>
            <Button
              type="primary"
              htmlType="submit"
              loading={loadingUpdate || isLoading}
            >
              {user ? "Update User" : "Add User"}
            </Button>
          </Form.Item>
        </Flex>
      </Form>
    </Modal>
  );
};

export default CreateUser;
