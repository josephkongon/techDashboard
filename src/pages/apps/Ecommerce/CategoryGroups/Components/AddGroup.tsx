import React, { FC, useEffect } from "react";
import {
  Button,
  Flex,
  Form,
  FormProps,
  Image,
  Input,
  message,
  Modal,
  Upload,
} from "antd";
import { PlusOutlined } from "@ant-design/icons";
import { useMutation } from "react-query";
import {
  createCategoryGroup,
  updateCategoryGroup,
} from "@/service/api/categoryGroup.ts";
import { CategoryGroup } from "@/types/categoryGroup.ts";

const { Dragger } = Upload;
type FieldType = {
  groupName?: string;
  image?: any;
};

interface IProps {
  isOpen: boolean;
  toggle: () => void;
  refetch: () => void;
  group?: CategoryGroup;
  setGroup: (value: any) => void;
}

const AddGroup: FC<IProps> = ({ isOpen, toggle, refetch, group, setGroup }) => {
  const [form] = Form.useForm();
  const { isLoading, mutateAsync } = useMutation(async (payload: FormData) =>
    createCategoryGroup({ payload }),
  );

  const { isLoading: loadingUpdate, mutateAsync: mutateUpdate } = useMutation(
    async (payload: { payload: FormData; id: string }) =>
      updateCategoryGroup(payload),
  );

  const onFinish: FormProps<FieldType>["onFinish"] = (values) => {
    const formData = new FormData();

    formData.append("name", values.groupName);
    if (!group) {
      formData.append("file", values.image.file);

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
    } else {
      if (values?.image?.file) {
        formData.append("file", values.image.file);
      }

      mutateUpdate(
        { id: group.id, payload: formData },
        {
          onSuccess: () => {
            message.success("Success!");
            form.resetFields();
            refetch();
            setGroup(null);
          },
          onError: () => {
            message.error("Error!");
          },
        },
      );
    }
  };

  useEffect(() => {
    if (group) {
      form.setFieldValue("groupName", group.name);
    }
  }, [group]);

  return (
    <Modal
      width={"45rem"}
      title={group ? "Edit Category Group" : "Add Category"}
      open={isOpen || !!group}
      onClose={() => {
        if (group) {
          setGroup(null);
        } else {
          toggle();
        }
      }}
      onCancel={() => {
        if (group) {
          setGroup(null);
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

        {group && (
          <div className="mt-3 ">
            <p>Current Image</p>
            <Image
              style={{ width: 150, height: 150 }}
              src={group.file.mediumUrl}
            />
          </div>
        )}

        <Flex className={"justify-content-end"}>
          <Form.Item label={null}>
            <Button
              type="primary"
              htmlType="submit"
              loading={isLoading || loadingUpdate}
            >
              {group ? "Update Group" : "Add Group"}
            </Button>
          </Form.Item>
        </Flex>
      </Form>
    </Modal>
  );
};

export default AddGroup;
