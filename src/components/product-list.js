"use client";
import Product from "../components/product";

const ProductList = ({ products, updateTotal, updateOrder, resetTrigger }) => {
  return (
    <div className="mb-4">
      {products.length === 0 ? (
        <p>Carregando produtos...</p>
      ) : (
        products.map((item) => (
          <Product
            key={item.id}
            item={item}
            updateTotal={updateTotal}
            updateOrder={updateOrder}
            resetTrigger={resetTrigger}
          />
        ))
      )}
    </div>
  );
};

export default ProductList;
