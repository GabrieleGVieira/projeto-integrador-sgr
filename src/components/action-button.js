import React from "react";
import { Button } from "./ui/button";

const ActionButton = ({ onClick, label, color }) => {
  return (
    <Button onClick={onClick} variant="outline" className={color} size="">
      {label}
    </Button>
  );
};

export default ActionButton;
