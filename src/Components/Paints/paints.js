import React from "react";
import Images from "../../Images/images";

const Paints = ({ color, picture, id, selected, setSelected }) => {
  return (
    <button
      disabled={id !== selected && selected !== ""}
      onClick={() => {
        selected !== id ? setSelected(id) : setSelected("");
      }}
    >
      <h1>{color}</h1>
      <img src={picture} alt="..." height="100px" />
    </button>
  );
};

export default Paints;
