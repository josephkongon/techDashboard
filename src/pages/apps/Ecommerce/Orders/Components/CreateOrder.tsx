import React, { FC, useEffect } from "react";
import { Button, Flex, Form, FormProps, Input, message, Modal } from "antd";
import { useMutation } from "react-query";
import { createOrder } from "@/service/api/order.ts";
import { useNavigate } from "react-router-dom";

interface IProps {
  userId?: string;
  username?: string;
  isOpen: boolean;
  toggle: () => void;
  setUserOrder: (value: any) => void;
}

const CreateOrder: FC<IProps> = ({ userId, isOpen, toggle, username }) => {
  const [form] = Form.useForm();
  const navigate = useNavigate();

  const { isLoading, mutateAsync } = useMutation(async (payload: any) =>
    createOrder(payload),
  );

  const onFinish: FormProps["onFinish"] = (values) => {
    if (userId) {
      mutateAsync(
        { userId },
        {
          onSuccess: (res) => {
            message.success("Order successfully created!");
            form.resetFields();
            navigate(`/store/orders/${res?.id}`);
          },
          onError: () => {
            message.error("Error creating Order");
          },
        },
      );
    }
  };

  useEffect(() => {
    if (userId && username) {
      form.setFieldValue("name", username);
    }
  }, [userId, username]);

  return (
    <Modal
      title={"Create order"}
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
        <Form.Item
          label="Customer name"
          name="name"
          rules={[{ required: true, message: "Please enter user's name" }]}
        >
          <Input disabled={true} />
        </Form.Item>

        <Flex className={"justify-content-end"}>
          <Form.Item label={null}>
            <Button type="primary" htmlType="submit" loading={isLoading}>
              Create Order
            </Button>
          </Form.Item>
        </Flex>
      </Form>
    </Modal>
  );
};

export default CreateOrder;
