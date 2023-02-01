import React, { useState } from "react";

const allItems = [
  { id: "beaming", value: "😁", isSmile: true },
  { id: "grinning", value: "😃", isSmile: true },
  { id: "squinting", value: "😆", isSmile: true },
  { id: "winking", value: "😉", isSmile: true },
  { id: "sad", value: "😥", isSmile: false },
];

function ArrayRendering() {
  const [isLoggedIn, setIsLoggedIn] = useState(true);
  const [items, setItems] = useState(allItems);

  const handleLogin = () => {
    setIsLoggedIn(true);
  };
  const handleLogout = () => {
    setIsLoggedIn(false);
  };

  const removeItem = (itemId) => {
    setItems(items.filter((item) => item.id !== itemId));
  };

  return (
    <div>
      <h1>Smileys</h1>
      <div className="loginControl">
        {isLoggedIn ? (
          <button onClick={handleLogout}>Logout</button>
        ) : (
          <button onClick={handleLogin}>Login</button>
        )}
      </div>
      <div>
        {isLoggedIn && (
          <ul>
            {items.map((item, index) => (
              <li key={item.id}>
                <button onClick={() => removeItem(item.id)}>remove</button>
                <label htmlFor={`${item.id}-input`}>
                  {item.value} {item.id}
                </label>
                <input
                  id={`${item.id}-input`}
                  type="text"
                  defaultValue={item.id}
                />
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}

export default ArrayRendering;
