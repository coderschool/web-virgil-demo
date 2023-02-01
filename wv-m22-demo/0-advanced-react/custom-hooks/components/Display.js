import React from "react";

function Display({ name, language }) {
  return <div>{`Hey ${name}, your favorite language is ${language}!`}</div>;
}

export default Display;
