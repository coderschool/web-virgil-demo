import React, { useContext } from "react";
import { CartContext } from "../App";

function ProductItem({ product }) {
  const handleAddToCart = useContext(CartContext);
  return (
    <div className="product-item">
      <h5 className="title">{product.name}</h5>
      <button onClick={() => handleAddToCart(product)}>Add to Cart</button>
    </div>
  );
}

export default ProductItem;
