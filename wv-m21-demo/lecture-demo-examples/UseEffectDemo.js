import React, { useState, useEffect } from "react";
import "./App.css";

function RepeatMessage({ message }) {
  useEffect(() => {
    const id = setInterval(() => {
      console.log(message);
    }, 2000);
    return () => {
      clearInterval(id);
    };
  });
  return <div>Logging to console {message}</div>;
}

function App() {
  console.log("rendering");
  const [language, setLanguage] = useState(
    () => window.localStorage.getItem("language") || ""
  );
  const [count, setCount] = useState(
    () => Number(window.localStorage.getItem("count")) || 0
  );

  useEffect(() => {
    console.log("change title");
    document.title = "Intro to useEffect";
  }, []);

  useEffect(() => {
    console.log("update language");
    window.localStorage.setItem("language", language);
  }, [language]);

  useEffect(() => {
    console.log("update count");
    window.localStorage.setItem("count", count);
  }, [count]);

  return (
    <>
      <div>
        <label htmlFor="language">Favorite Language: </label>
        <input
          id="language"
          value={language}
          onChange={(event) => setLanguage(event.target.value)}
        />
        {language ? (
          <div>{`Your favorite language is ${language}`}</div>
        ) : (
          <div>Please type your favorite language</div>
        )}
      </div>
      <br />
      <button onClick={() => setCount(count + 1)}>{count}</button>
    </>
  );
}

export default App;
