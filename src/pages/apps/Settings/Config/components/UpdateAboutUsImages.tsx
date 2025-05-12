import React, { FC, useState } from "react";
import { Button, Form, message, Modal, Upload } from "antd";
import useConfig from "@/hooks/queries/useConfig";
import { useMutation } from "react-query";
import { updateImage } from "@/service/api/config.ts";
import { PlusOutlined } from "@ant-design/icons";
import imageCompression from "browser-image-compression";

interface IProps {
  isOpen: boolean;
  toggle: () => void;
  refetch: () => void;
}
const UpdateAboutUsImages: FC<IProps> = ({ isOpen, toggle, refetch }) => {
  const [form] = Form.useForm();
  const { data } = useConfig();
  const [fileList, setFileList] = useState([]);
  const { isLoading, mutateAsync } = useMutation(async (payload: any) =>
    updateImage(data?.id, payload),
  );

  const handleFileChange = async ({ fileList: newFileList }) => {
    const compressedList = await Promise.all(
      newFileList.map(async (file) => {
        try {
          const compressedFile = await imageCompression(file.originFileObj, {
            maxSizeMB: 0.2,
            maxWidthOrHeight: 800,
            useWebWorker: true,
          });

          return {
            ...file,
            originFileObj: compressedFile,
          };
        } catch (error) {
          console.error("Compression error:", error);
          return file;
        }
      }),
    );

    setFileList(compressedList);
  };

  const onFinish = (values: any) => {
    const formData = new FormData();

    if (!fileList.length) {
      message.warning("Please select at least 1 image of the product");
      return;
    }
    fileList.forEach((file) => {
      formData.append("file", file.originFileObj);
    });

    mutateAsync(formData, {
      onSuccess: () => {
        form.resetFields();
        setFileList([]);
        message.success("Successfully updated configuration");
        refetch();
        toggle();
      },
      onError: () => {
        message.error("Error updating configuration");
      },
    });
  };

  return (
    <Modal
      title={"Update Basic config"}
      open={isOpen}
      destroyOnClose
      onClose={toggle}
      onCancel={toggle}
      footer={null}
      height={600}
    >
      <Form
        form={form}
        name="basic"
        initialValues={{ remember: true }}
        onFinish={onFinish}
        autoComplete="off"
        layout="vertical"
      >
        <Form.Item
          label="About Us Image"
          // name="image"
          rules={[{ required: true, message: "Please upload the image!" }]}
        >
          <Upload
            beforeUpload={() => false}
            listType="picture-card"
            maxCount={5}
            fileList={fileList}
            onChange={handleFileChange}
            accept="image/*"
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

export default UpdateAboutUsImages;
