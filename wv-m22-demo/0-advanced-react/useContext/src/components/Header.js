import React from "react";

function Header({ nItems }) {
  return (
    <div className="header">
      <h2>CS Store</h2>
      <h4>Cart ({nItems})</h4>
    </div>
  );
}

export default Header;
