import React, { useEffect, useState } from "react";
import Supply from "../Components/Supplies/supply";
import Paints from "../Components/Paints/paints";
import { db } from "../Firebase/Firebase";
const Inventory = () => {
  const [furniture, setFurniture] = useState("");
  const [paintColor, setPaintColor] = useState("");
  const [dbFurniture, setDbFurniture] = useState("");
  const [dbverfkleur, setDbVerfkleur] = useState("");

  useEffect(() => {
    db.collection("voorraad")
      .get()
      .then((querySnapshot) => {
        querySnapshot.forEach((doc) =>
          setDbFurniture([...dbFurniture, doc.data()])
        );
      });

    db.collection("verfkleur")
      .get()
      .then((querySnapshot) => {
        querySnapshot.forEach((doc) =>
          setDbVerfkleur([...dbverfkleur, doc.data()])
        );
      });
  }, []);

  return (
    <div className="inventory">
      {console.log("What up brother", dbFurniture)}
      {console.log("waayoo", dbverfkleur)}
      <h1>Voorraad</h1>
      <div className="inventory-items">
        {(dbFurniture || []).map((item, i) => {
          console.log(item);
          return (
            <Supply
              setSelected={setFurniture}
              key={i}
              id={i}
              selected={furniture}
              title={item.title}
              price={item.price}
              picture={item.images}
            />
          );
        })}
      </div>
      <div className="inventory-items">
        {(dbverfkleur || []).map((paint, i) => {
          console.log(paint);
          return (
            <Paints
              key={i}
              id={i}
              selected={paintColor}
              setSelected={setPaintColor}
              color={paint.color}
              picture={paint.images}
            />
          );
        })}
      </div>
      <button disabled={furniture === "" || paintColor === ""}>Submit</button>
    </div>
  );
};

export default Inventory;
