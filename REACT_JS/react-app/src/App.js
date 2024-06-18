import React, { useState } from "react";

function App() {
  const [like, setLike] = useState(0);

  const handleClick = () => {
    setLike(1 - like);
  };
  return <h1 onClick={handleClick}> {like === 1 ? "👍" : "👎"}</h1>;
}

export default App;
