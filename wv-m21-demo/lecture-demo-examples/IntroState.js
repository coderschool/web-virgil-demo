import React, { useState } from "react";

/**
 * @Important
 * - @EventHandlers as arrow functions
 *
 * - @InitialStates as objects, functions
 *
 * - @RenderMechanism
 *    - Mount -> run functions in useState -> render -> update DOM
 *    - Update -> re-render -> update DOM
 */

function IntroState() {
  const [like, setLike] = useState(1);
  const [blog, setBlog] = useState({
    content: "React is awesome",
    count: 0,
  });
  console.log("render");

  const handleClick = (name) => {
    // logic
    console.log(name);
    // setLike(1 - like);
    setBlog({ ...blog, count: blog.count + 1 });
  };

  return (
    <div>
      <p>{blog.content}</p>
      <h1 onClick={() => handleClick("CoderSchool")}>
        {like === 1 ? "👍" : "👎"} {blog.count}
      </h1>
    </div>
  );
}

export default IntroState;
