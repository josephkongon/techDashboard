import React, { FC } from "react";
import type { UploadProps } from "antd";
import {
  Button,
  Flex,
  Form,
  FormProps,
  Input,
  message,
  Modal,
  Upload,
} from "antd";
import { InboxOutlined } from "@ant-design/icons";

const { Dragger } = Upload;
type FieldType = {
  groupName?: string;
  image?: string;
};

interface IProps {
  isOpen: boolean;
  toggle: () => void;
}
const props: UploadProps = {
  name: "file",
  multiple: true,
  action: "https://660d2bd96ddfa2943b33731c.mockapi.io/api/upload",
  onChange(info) {
    const { status } = info.file;
    if (status !== "uploading") {
      console.log(info.file, info.fileList);
    }
    if (status === "done") {
      message.success(`${info.file.name} file uploaded successfully.`);
    } else if (status === "error") {
      message.error(`${info.file.name} file upload failed.`);
    }
  },
  onDrop(e) {
    console.log("Dropped files", e.dataTransfer.files);
  },
};

const AddGroup: FC<IProps> = ({ isOpen, toggle }) => {
  const onFinish: FormProps<FieldType>["onFinish"] = (values) => {
    console.log("Success:", values);
  };

  return (
    <Modal
      width={"45rem"}
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
      >
        <Form.Item<FieldType>
          label="Group Name"
          name="groupName"
          rules={[{ required: true, message: "Please enter the Group Name!" }]}
        >
          <Input />
        </Form.Item>

        <Form.Item<FieldType>
          label="Group Image"
          name="image"
          rules={[{ required: true, message: "Please upload the image!" }]}
        >
          <Dragger {...props}>
            <p className="ant-upload-drag-icon">
              <InboxOutlined />
            </p>
            <p className="ant-upload-text">
              Click or drag file to this area to upload
            </p>
            <p className="ant-upload-hint">
              Support for a single or bulk upload. Strictly prohibited from
              uploading company data or other banned files.
            </p>
          </Dragger>
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

export default AddGroup;
