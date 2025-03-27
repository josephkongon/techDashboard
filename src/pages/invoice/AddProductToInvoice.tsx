import React, { FC, useState } from "react";
import { Button, Flex, Form, FormProps, Image, InputNumber, Modal } from "antd";
import DebounceSelect from "@/searchSelect/SeachSelect.tsx";
import { getProducts } from "@/service/api/product.ts";
import { CURRENCY } from "@/types/constand.ts";

interface IProps {
  isOpen: boolean;
  toggle: () => void;
  update: (i: { id: string; quantity: number }) => void;
}

async function fetchUserList(name: string) {
  const filter = `&filter=name||$contL||${name}`;

  const data = await getProducts({ filter });
  return data.data.map((product) => {
    return {
      label: (
        <Flex style={{ justifyContent: "space-between", paddingRight: 10 }}>
          <Flex style={{ gap: 5, alignItems: "center" }}>
            <Image
              style={{ height: 50, width: 50, objectFit: "cover" }}
              src={product?.productImages?.[0]?.file.thumbnailUrl}
            />
            {product.name}
          </Flex>
          <Flex style={{ alignItems: "center" }}>
            {product?.quantity} In Stock
          </Flex>

          <Flex style={{ alignItems: "center" }}>
            {product?.price} {CURRENCY}
          </Flex>
        </Flex>
      ),
      value: product.id,
    };
  });
}

const AddProductToInvoice: FC<IProps> = ({ isOpen, toggle, update }) => {
  const [value, setValue] = useState("");

  const onFinish: FormProps["onFinish"] = (values) => {
    update({ id: value, quantity: values.quantity });
    toggle();
  };

  return (
    <Modal
      width={"45rem"}
      title={"Product"}
      open={isOpen}
      onClose={() => {
        setValue("");
        toggle();
      }}
      onCancel={() => {
        setValue("");
        toggle();
      }}
      footer={null}
      destroyOnClose={true}
    >
      <Form name="basic" onFinish={onFinish} autoComplete="off">
        <Form.Item
          label="Product"
          name="name"
          rules={[{ required: true, message: "Please select a product" }]}
        >
          <DebounceSelect
            showSearch
            // value={value}
            placeholder="Select product"
            fetchOptions={fetchUserList}
            style={{ width: "100%", height: 70 }}
            // onChange={(newValue) => setValue(newValue)}
            onSelect={({ value }, option) => {
              setValue(value);
            }}
          />
        </Form.Item>

        <Form.Item
          label="Quantity"
          name="quantity"
          rules={[
            { required: true, message: "Please enter quantity in stock" },
          ]}
        >
          <InputNumber min={1} />
        </Form.Item>

        <Flex className={"justify-content-end"}>
          <Form.Item label={null}>
            <Button type="primary" htmlType="submit">
              Update
            </Button>
          </Form.Item>
        </Flex>
      </Form>
    </Modal>
  );
};

export default AddProductToInvoice;
