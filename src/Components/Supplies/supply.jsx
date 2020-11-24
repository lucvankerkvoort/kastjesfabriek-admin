import React from "react";

const Supply = ({ selected, title, picture, price, setSelected, id }) => {
  return (
    <button
      disabled={id !== selected && selected !== ""}
      onClick={() => {
        selected !== id ? setSelected(id) : setSelected("");
      }}
    >
      <h1>{title}</h1>
      <img src={picture} alt="..." height="100px" />
      <p>Price: ${price}</p>
    </button>
  );
};

export default Supply;
