"use client";
import { useState } from "react";
import { Button } from "./ui/button";
import { FaMinus, FaPlus } from "react-icons/fa";

const Product = ({ item, updateTotal }) => {
  const [quantity, setQuantity] = useState(0);
  const [total, setTotal] = useState(0);

  const increment = () => {
    setQuantity((prevQuantity) => {
      const newQuantity = prevQuantity + 1;
      setTotal(item.price * newQuantity);
      updateTotal((prevTotal) => prevTotal + item.price);
      return newQuantity;
    });
  };

  const decrement = () => {
    if (quantity > 0) {
      setQuantity((prevQuantity) => {
        const newQuantity = prevQuantity - 1;
        setTotal(item.price * newQuantity);
        updateTotal((prevTotal) => prevTotal - item.price);
        return newQuantity;
      });
    }
  };

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
