import React, { FC, useEffect } from "react";
import { Button, Form, message, Modal } from "antd";
import useConfig from "@/hooks/queries/useConfig";
import { useMutation } from "react-query";
import { updateBasic } from "@/service/api/config.ts";
import JoditEditor from "jodit-react";

interface IProps {
  isOpen: boolean;
  toggle: () => void;
  refetch: () => void;
}
const UpdateAboutUs: FC<IProps> = ({ isOpen, toggle, refetch }) => {
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
    form.setFieldValue("aboutUs", data?.aboutUs);
  }, [data]);

  return (
    <Modal
      title={"Update Basic config"}
      open={isOpen}
      destroyOnClose
      onClose={toggle}
      onCancel={toggle}
      footer={null}
      width={800}
      height={600}
    >
      <Form
        form={form}
        name="basic"
        initialValues={{ remember: true }}
        onFinish={onFinish}
        autoComplete="off"
        style={{ maxWidth: 800 }}
        layout="vertical"
      >
        <Form.Item
          label="About Us"
          name="aboutUs"
          rules={[{ required: true, message: "Please input about us!" }]}
        >
          <JoditEditor />
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

export default UpdateAboutUs;
