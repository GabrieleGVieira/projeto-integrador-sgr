"use client";
import { useState, useEffect } from "react";
import { Button } from "./ui/button";
import { FaMinus, FaPlus } from "react-icons/fa";

const Product = ({ item, updateTotal, updateOrder, resetTrigger }) => {
  const [quantity, setQuantity] = useState(0);

  const increment = () => {
    setQuantity((prevQuantity) => prevQuantity + 1);
    updateTotal((prevTotal) => prevTotal + item.price);
  };

  const decrement = () => {
    if (quantity > 0) {
      setQuantity((prevQuantity) => prevQuantity - 1);
      updateTotal((prevTotal) => prevTotal - item.price);
    }
  };

  useEffect(() => {
    if (quantity >= 0) {
      const unitPrice = item.price;
      const totalPrice = quantity * unitPrice;

      updateOrder({
        productId: item.id,
        quantity,
        unitPrice,
        totalPrice,
      });
    }
  }, [quantity, item.id, item.price, updateOrder]);

  useEffect(() => {
    setQuantity(0);
  }, [resetTrigger]);

  return (
    <div className="flex items-center justify-between py-2">
      <div className="flex items-center space-x-2">
        <span>{item.name}</span>
      </div>
      <div className="flex items-center space-x-4">
        <span>R$ {item.price}</span>
        <div className="flex items-center space-x-2">
          <Button
            size="icon"
            variant="outline"
            className="bg-red-600"
            onClick={decrement}
          >
            <FaMinus />
          </Button>
          <span>{quantity}</span>
          <Button
            size="icon"
            variant="outline"
            className="bg-green-600"
            onClick={increment}
          >
            <FaPlus />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Product;
