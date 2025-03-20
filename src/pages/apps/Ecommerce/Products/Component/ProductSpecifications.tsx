import React, { useState } from "react";
import { Checkbox, Form, Input, Select } from "antd";
import { ColorOptions, ProductSpecificationsMap } from "@/types/product.ts";
import { useTranslation } from "react-i18next";

const { Option } = Select;

const ProductSpecifications = () => {
  const { t } = useTranslation();
  const [form] = Form.useForm();
  const [enableSpecifications, setEnableSpecifications] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState(null);

  return (
    <>
      <Checkbox
        className={"mb-3"}
        checked={enableSpecifications}
        onChange={(e) => setEnableSpecifications(e.target.checked)}
      >
        Enable Specifications
      </Checkbox>
      {enableSpecifications && (
        <>
          <Form.Item label="Product Type">
            <Select
              placeholder="Select a product type"
              onChange={setSelectedCategory}
              allowClear
            >
              {Object.keys(ProductSpecificationsMap).map((category) => (
                <Option key={category} value={category}>
                  {category}
                </Option>
              ))}
            </Select>
          </Form.Item>
          {selectedCategory && (
            <>
              {ProductSpecificationsMap[selectedCategory].map((spec) => (
                <Form.Item
                  key={spec}
                  name={spec}
                  label={t(spec)}
                  style={{ marginBottom: "8px" }}
                >
                  {spec === "colors" ? (
                    <Select
                      mode="multiple"
                      placeholder="Select available colors"
                      showSearch
                      optionLabelProp="label"
                    >
                      {ColorOptions.map((color) => (
                        <Option key={color} value={color} label={color}>
                          <span
                            style={{ display: "flex", alignItems: "center" }}
                          >
                            <span
                              style={{
                                backgroundColor: color.toLowerCase(),
                                width: 16,
                                height: 16,
                                borderRadius: "50%",
                                display: "inline-block",
                                marginRight: 8,
                                border: "1px solid #ccc",
                              }}
                            ></span>
                            {color}
                          </span>
                        </Option>
                      ))}
                    </Select>
                  ) : (
                    <Input placeholder={`Enter ${t(spec)}`} />
                  )}
                </Form.Item>
              ))}
            </>
          )}
        </>
      )}
    </>
  );
};

export default ProductSpecifications;
