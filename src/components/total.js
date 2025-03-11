"use client";
const Total = ({ total }) => {
  return (
    <div className="bg-brown-200 p-4 rounded-md">
      <div className="flex justify-between">
        <span>Total</span>
        <span> R$ {total.toFixed(2)}</span>
      </div>
    </div>
  );
};

export default Total;
