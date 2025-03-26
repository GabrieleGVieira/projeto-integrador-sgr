"use client";
const Total = ({ total }) => {
  return (
    <div className="bottom-16 bg-white p-4">
      <div className="flex justify-between text-lg font-bold">
        <span>Total</span>
        <span> R$ {total.toFixed(2)}</span>
      </div>
    </div>
  );
};

export default Total;
