import React, { useState } from "react";
import ProductList from "./ProductList";

function MainContent() {
  const [products, setProducts] = useState([
    { name: "Intro to React" },
    { name: "Advanced React" },
    { name: "State Management with Redux" },
  ]);
  return (
    <div className="main">
      <h2>Products</h2>
      <ProductList products={products} />
    </div>
  );
}

export default MainContent;
