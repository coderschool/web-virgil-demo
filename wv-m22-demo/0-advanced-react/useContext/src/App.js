import React, { useState, createContext } from "react";
import "./App.css";
import Header from "./components/Header";
import MainContent from "./components/MainContent";
import SideMenu from "./components/SideMenu";

export const CartContext = createContext();

function App() {
  const [cart, setCart] = useState([]);
  const handleAddToCart = (product) => {
    setCart([...cart, product]);
  };
  return (
    <>
      <CartContext.Provider value={handleAddToCart}>
        <Header nItems={cart.length} />
        <div className="row">
          <SideMenu />
          <MainContent />
        </div>
      </CartContext.Provider>
    </>
  );
}

export default App;
