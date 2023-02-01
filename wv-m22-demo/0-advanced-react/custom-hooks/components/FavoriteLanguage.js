import React from "react";

function FavoriteLanguage({ language, setLanguage }) {
  return (
    <div>
      <label htmlFor="language"> Favorite Language:</label>
      <input
        id="language"
        type="text"
        value={language}
        onChange={(e) => setLanguage(e.target.value)}
        autoComplete="off"
      />
    </div>
  );
}

export default FavoriteLanguage;
