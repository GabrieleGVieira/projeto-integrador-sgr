"use client";
import Product from "../components/product";
import Total from "../components/total";

const ProductList = ({ products, updateTotal, total }) => {
  return (
    <div className="mb-4">
      {products.length === 0 ? (
        <p>Carregando produtos...</p>
      ) : (
        products.map((item) => (
          <Product key={item.id} item={item} updateTotal={updateTotal} />
        ))
      )}
      <Total total={total} />
    </div>
  );
};

export default ProductList;
