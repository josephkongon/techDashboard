import React, { FC } from "react";
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
import { PlusOutlined } from "@ant-design/icons";
import { useMutation } from "react-query";
import { createCategoryGroup } from "@/service/api/categoryGroup.ts";

const { Dragger } = Upload;
type FieldType = {
  groupName?: string;
  image?: any;
};

interface IProps {
  isOpen: boolean;
  toggle: () => void;
  refetch: () => void;
}

const AddGroup: FC<IProps> = ({ isOpen, toggle, refetch }) => {
  const [form] = Form.useForm();
  const { isLoading, mutateAsync } = useMutation(async (payload: FormData) =>
    createCategoryGroup({ payload }),
  );

  const onFinish: FormProps<FieldType>["onFinish"] = (values) => {
    const formData = new FormData();

    formData.append("file", values.image.file);
    formData.append("name", values.groupName);

    mutateAsync(formData, {
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
        form={form}
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
          <Upload
            beforeUpload={() => false}
            listType="picture-card"
            maxCount={1}
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

        <Flex className={"justify-content-end"}>
          <Form.Item label={null}>
            <Button type="primary" htmlType="submit" loading={isLoading}>
              Add Group
            </Button>
          </Form.Item>
        </Flex>
      </Form>
    </Modal>
  );
};

export default AddGroup;
