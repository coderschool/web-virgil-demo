import React from "react";
import ProductItem from "./ProductItem";

function ProductList({ products }) {
  return (
    <div className="product-list">
      {products?.map((product) => (
        <ProductItem key={product.name} product={product} />
      ))}
    </div>
  );
}

export default ProductList;
