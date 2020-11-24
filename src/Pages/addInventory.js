import React, { useState } from "react";

const AddInventory = (props) => {
  const [selection, addSelection] = useState("");
  return (
    <div>
      <select onChange={(e) => addSelection(e.target.value)}>
        <option>...</option>
        <option value="voorraad">Voorraad toevoegen</option>
        <option value="verfkleur">Kleur toevoegen</option>
      </select>
      <button onClick={() => props.history.push(`/${selection}`)}>
        Submit
      </button>
    </div>
  );
};

export default AddInventory;
