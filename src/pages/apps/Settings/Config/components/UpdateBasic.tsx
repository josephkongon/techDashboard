import React, { FC, useEffect } from "react";
import { Button, Form, Input, message, Modal, Switch } from "antd";
import useConfig from "@/hooks/queries/useConfig";
import { useMutation } from "react-query";
import { updateBasic } from "@/service/api/config.ts";

interface IProps {
  isOpen: boolean;
  toggle: () => void;
  refetch: () => void;
}
const UpdateBasic: FC<IProps> = ({ isOpen, toggle, refetch }) => {
  const [form] = Form.useForm();
  const { data } = useConfig();

  const { isLoading, mutateAsync } = useMutation(async (payload: any) =>
    updateBasic(data?.id, payload),
  );

  const onFinish = (values: any) => {
    mutateAsync(values, {
      onSuccess: () => {
        message.success("Successfully updated configuration");
        refetch();
        toggle();
      },
      onError: () => {
        message.error("Error updating configuration");
      },
    });
  };

  useEffect(() => {
    form.setFieldValue("email", data?.email);
    form.setFieldValue("hotline", data?.hotline);
    form.setFieldValue("whatsappNumber", data?.whatsappNumber);
    form.setFieldValue("enableWhatsapp", data?.enableWhatsapp);
    form.setFieldValue("facebook", data?.facebook);
  }, [data]);

  return (
    <Modal
      title={"Update Basic config"}
      open={isOpen}
      destroyOnClose
      onClose={toggle}
      onCancel={toggle}
      footer={null}
    >
      <Form
        form={form}
        name="basic"
        labelCol={{ span: 8 }}
        wrapperCol={{ span: 16 }}
        style={{ maxWidth: 600 }}
        initialValues={{ remember: true }}
        onFinish={onFinish}
        autoComplete="off"
      >
        <Form.Item
          label="Email"
          name="email"
          rules={[{ required: true, message: "Please input your email!" }]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="Hotline"
          name="hotline"
          rules={[{ required: true, message: "Please input your hotline!" }]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="Whatsapp Number"
          name="whatsappNumber"
          rules={[
            { required: true, message: "Please input your whatsapp number!" },
          ]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="Whatsapp Enabled"
          name="enableWhatsapp"
          rules={[{ required: true }]}
        >
          <Switch />
        </Form.Item>

        <Form.Item
          label="Faceback page"
          name="facebook"
          rules={[
            { required: true, message: "Please input your facebook page!" },
          ]}
        >
          <Input />
        </Form.Item>

        <Form.Item label={null}>
          <Button loading={isLoading} type="primary" htmlType="submit">
            Submit
          </Button>
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default UpdateBasic;
