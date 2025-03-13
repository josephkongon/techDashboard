import React, { FC } from "react";
import {
  Button,
  Drawer,
  Flex,
  Form,
  FormProps,
  Input,
  InputNumber,
  Select,
} from "antd";
import JoditEditor from "jodit-react";
import ProductSpecifications from "@/pages/apps/Ecommerce/Categories/Components/ProductSpecifications.tsx";

type FieldType = {
  name?: string;
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
}
const AddProduct: FC<IProps> = ({ isOpen, toggle }) => {
  const onFinish: FormProps<FieldType>["onFinish"] = (values) => {
    console.log("Success:", values);
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
      >
        <Form.Item<FieldType>
          label="Product Name"
          name="name"
          rules={[{ required: true, message: "Please enter the product name" }]}
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
            options={[
              { value: "1", label: "Jack" },
              { value: "2", label: "Lucy" },
              { value: "3", label: "Tom" },
            ]}
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

        <ProductSpecifications />

        <Flex className={"justify-content-end mt-3"}>
          <Form.Item label={null}>
            <Button type="primary" htmlType="submit">
              Add Product
            </Button>
          </Form.Item>
        </Flex>
      </Form>
    </Drawer>
  );
};

export default AddProduct;
