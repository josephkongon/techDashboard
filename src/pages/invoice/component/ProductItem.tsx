import React, { FC, useMemo } from "react";
import Parser from "html-react-parser";

interface IItems {
  id: string;
  quantity: number;
  price: number;
}
interface IProps {
  itemNumber: number;
  quantity: number;
  price: number;
  productItem: any;
}
const ProductItem: FC<IProps> = ({
  itemNumber,
  quantity,
  price,
  productItem,
}) => {
  const total = useMemo(() => {
    return price * quantity;
  }, [productItem, quantity]);

  return (
    <tr key={productItem?.id}>
      <td>{itemNumber + 1}</td>
      <td>
        <b>{productItem?.product?.name}</b> <br />
        {Parser(productItem?.product?.description || "")}
      </td>
      <td>{quantity}</td>
      <td>{price}</td>
      <td className="text-end">{total}</td>
    </tr>
  );
};

export default ProductItem;
