import React, { FC, useEffect, useState } from "react";
import { Button, Form, Input, message, Modal, Upload } from "antd";
import { useMutation } from "react-query";
import { PlusOutlined } from "@ant-design/icons";
import { createContactUs } from "@/service/api/contactUs.ts";
import { appendObjectToFormData } from "@/utils/formdata.ts";
import { removeUndefinedKeys } from "@/utils/general.ts";

interface IProps {
  isOpen: boolean;
  toggle: () => void;
  refetch: () => void;
}
const CreateContactUs: FC<IProps> = ({ isOpen, toggle, refetch }) => {
  const [form] = Form.useForm();
  const [fileList, setFileList] = useState([]);

  const { isLoading, mutateAsync } = useMutation(async (payload: any) =>
    createContactUs(payload),
  );

  const onFinish = (values: any) => {
    const formData = new FormData();

    if (!fileList.length) {
      message.warning("Please select at least 1 image of the product");
      return;
    }
    fileList.forEach((file) => {
      formData.append("file", file.originFileObj);
    });

    appendObjectToFormData(formData, removeUndefinedKeys(values));

    mutateAsync(formData, {
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

  const handleFileChange = ({ fileList }) => {
    setFileList(fileList);
  };

  useEffect(() => {
    // form.setFieldValue("email", data?.email);
    // form.setFieldValue("hotline", data?.hotline);
    // form.setFieldValue("whatsappNumber", data?.whatsappNumber);
    // form.setFieldValue("enableWhatsapp", data?.enableWhatsapp);
    // form.setFieldValue("facebook", data?.facebook);
  }, []);

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
          label="City"
          name="city"
          rules={[{ required: true, message: "Please input your city!" }]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="Phone 1"
          name="phone1"
          rules={[{ required: true, message: "Please input your phone 1!" }]}
        >
          <Input />
        </Form.Item>
        <Form.Item label="Phone 2" name="phone2">
          <Input />
        </Form.Item>

        <Form.Item
          label="Address"
          name="address"
          rules={[{ required: true, message: "Please input your address!" }]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="Office Hours"
          name="officeHours"
          rules={[
            { required: true, message: "Please input your Office Hours!" },
          ]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="Image"
          // name="image"
          rules={[{ required: true, message: "Please upload the image!" }]}
        >
          <Upload
            beforeUpload={() => false}
            listType="picture-card"
            maxCount={1}
            fileList={fileList}
            onChange={handleFileChange}
          >
            <button
              style={{
                color: "inherit",
                cursor: "pointer",
                border: 0,
                background: "none",
              }}
              type="button"
            >
              <PlusOutlined />
              <div style={{ marginTop: 8 }}>Upload</div>
            </button>
          </Upload>
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

export default CreateContactUs;
