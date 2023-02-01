import React from "react";

function Name({ name, setName }) {
  return (
    <div>
      <label htmlFor="name"> Name:</label>
      <input
        id="name"
        type="text"
        value={name}
        onChange={(e) => setName(e.target.value)}
        autoComplete="off"
      />
    </div>
  );
}

export default Name;
