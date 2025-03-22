import { ProductSpecificationsMap } from "@/types/product.ts";

export const getAllSpecificationsValues = () => {
  let values = [];
  Object.values(ProductSpecificationsMap).forEach((value) => {
    values = [...values, ...value];
  });

  return Array.from(new Set(values));
};

export const getProductSpecification = (data: Record<string, any>) => {
  const specificationKeys = getAllSpecificationsValues();
  const foundSpecifications: { key: string; value: any }[] = [];

  specificationKeys.forEach((key) => {
    if (data.hasOwnProperty(key) && data[key]) {
      foundSpecifications.push({ key, value: data[key] });
    }
  });

  return foundSpecifications;
};
