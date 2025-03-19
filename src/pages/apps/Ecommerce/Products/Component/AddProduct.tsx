import React, { FC, useState } from "react";
import {
  Button,
  Drawer,
  Flex,
  Form,
  FormProps,
  Input,
  InputNumber,
  message,
  Select,
  Upload,
} from "antd";
import JoditEditor from "jodit-react";
import ProductSpecifications from "@/pages/apps/Ecommerce/Products/Component/ProductSpecifications.tsx";
import { PlusOutlined } from "@ant-design/icons";
import useCategory from "@/hooks/queries/useCategory.ts";
import { useMutation } from "react-query";
import { createProduct } from "@/service/api/product.ts";
import { appendObjectToFormData } from "@/utils/formdata.ts";

type FieldType = {
  name?: string;
  brand?: string;
  description?: string;
  summary?: string;
  price?: number;
  categoryId?: string;
  tag?: string;
  quantity?: string;
};

interface IProps {
  isOpen: boolean;
  toggle: () => void;
  refetch: () => void;
}
const AddProduct: FC<IProps> = ({ isOpen, toggle, refetch }) => {
  const [form] = Form.useForm();
  const { data } = useCategory();
  const [fileList, setFileList] = useState([]);

  const { isLoading, mutateAsync } = useMutation(async (payload: any) =>
    createProduct(payload),
  );

  const handleFileChange = ({ fileList }) => {
    setFileList(fileList);
  };

  const onFinish: FormProps<FieldType>["onFinish"] = (values) => {
    console.log({ values });
    const formData = new FormData();

    if (!fileList.length) {
      message.warning("Please select at least 1 image of the product");
      return;
    }
    fileList.forEach((file) => {
      formData.append("file", file.originFileObj);
    });
    // formData.append("file", values.image?.fileList);

    // for (let i = 0; i < values.image?.fileList; i++) {
    //   formData.append("file", values.image?.fileList[i]); // Append each file
    // }

    // delete values.image;
    appendObjectToFormData(formData, values);

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
    <Drawer
      width={"50rem"}
      title={"Add New Product"}
      open={isOpen}
      onClose={toggle}
      // onCancel={toggle}
      footer={null}
    >
      <Form
        labelCol={{ span: 6 }}
        wrapperCol={{ span: 20 }}
        style={{ maxWidth: "45rem" }}
        className={"mt-3"}
        name="basic"
        onFinish={onFinish}
        autoComplete="off"
        form={form}
      >
        <Form.Item<FieldType>
          label="Product Name"
          name="name"
          rules={[{ required: true, message: "Please enter the product name" }]}
        >
          <Input />
        </Form.Item>

        <Form.Item<FieldType>
          label="Brand"
          name="brand"
          rules={[{ required: true, message: "Please enter the brand" }]}
        >
          <Input />
        </Form.Item>

        <Form.Item<FieldType>
          label="Price"
          name="price"
          rules={[{ required: true, message: "Please enter the price" }]}
        >
          <InputNumber min={1} />
        </Form.Item>
        <Form.Item<FieldType>
          label="Quantity"
          name="quantity"
          rules={[
            { required: true, message: "Please enter quantity in stock" },
          ]}
        >
          <InputNumber min={1} />
        </Form.Item>

        <Form.Item<FieldType>
          label="Product Description"
          name="description"
          rules={[
            { required: true, message: "Please enter the product description" },
          ]}
        >
          <JoditEditor />
        </Form.Item>

        <Form.Item<FieldType>
          label="Product Summary"
          name="summary"
          rules={[{ message: "Please enter the product summary" }]}
        >
          <JoditEditor />
        </Form.Item>

        <Form.Item<FieldType>
          label="Product Category"
          name="categoryId"
          rules={[
            { required: true, message: "Please select the product category" },
          ]}
        >
          <Select
            showSearch
            placeholder="Select a category"
            filterOption={(input, option) =>
              (option?.label ?? "").toLowerCase().includes(input.toLowerCase())
            }
            options={data?.map((item) => {
              return { value: item.id, label: item.name };
            })}
          />
        </Form.Item>

        <Form.Item<FieldType>
          label="Product Tag"
          name="tag"
          rules={[{ message: "Please select the product tag" }]}
        >
          <Select
            showSearch
            placeholder="Select a tag"
            filterOption={(input, option) =>
              (option?.label ?? "").toLowerCase().includes(input.toLowerCase())
            }
            options={[
              { value: "NEW", label: "New" },
              { value: "SECONDHAND", label: "Second hand" },
              { value: "COMING_SOON", label: "Coming soon" },
            ]}
          />
        </Form.Item>

        <Form.Item<FieldType>
          label="Group Image"
          // name="image"
          rules={[{ required: true, message: "Please upload the image!" }]}
        >
          <Upload
            beforeUpload={() => false}
            listType="picture-card"
            maxCount={5}
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

        <ProductSpecifications />

        <Flex className={"justify-content-end mt-3"}>
          <Form.Item label={null}>
            <Button loading={isLoading} type="primary" htmlType="submit">
              Add Product
            </Button>
          </Form.Item>
        </Flex>
      </Form>
    </Drawer>
  );
};

export default AddProduct;
