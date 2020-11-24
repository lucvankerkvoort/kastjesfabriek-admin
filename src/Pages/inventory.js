import React, { useState } from "react";
import Images from "../Images/images";
import Supply from "../Components/Supplies/supply";
import Paints from "../Components/Paints/paints";
const Inventory = () => {
  const [furniture, setFurniture] = useState("");
  const [paintColor, setPaintColor] = useState("");

  const fakeData = [
    {
      title: "BlaBla",
      price: "Blabla",
      picture: Images.instagram,
    },
    {
      title: "BlaBla",
      price: "Blabla",
      picture: Images.instagram,
    },
    {
      title: "BlaBla",
      price: "Blabla",
      picture: Images.instagram,
    },
    {
      title: "BlaBla",
      price: "Blabla",
      picture: Images.instagram,
    },
    {
      title: "BlaBla",
      price: "Blabla",
      picture: Images.instagram,
    },
    {
      title: "BlaBla",
      price: "Blabla",
      picture: Images.instagram,
    },
    {
      title: "BlaBla",
      price: "Blabla",
      picture: Images.instagram,
    },
  ];

  const fakeDataPaint = [
    {
      color: "Gray",
      picture: Images.jumbotronBackground,
    },
    {
      color: "Blue",
      picture: Images.jumbotronBackground,
    },
    {
      color: "Black",
      picture: Images.jumbotronBackground,
    },
    {
      color: "Green",
      picture: Images.jumbotronBackground,
    },
    {
      color: "White",
      picture: Images.jumbotronBackground,
    },
    {
      color: "Patrick",
      picture: Images.jumbotronBackground,
    },
  ];
  return (
    <div className="inventory">
      <h1>Voorraad</h1>
      <div className="inventory-items">
        {fakeData.map((item, i) => (
          <Supply
            setSelected={setFurniture}
            key={i}
            id={i}
            selected={furniture}
            title={item.title}
            price={item.price}
            picture={item.picture}
          />
        ))}
      </div>
      <div className="inventory-items">
        {fakeDataPaint.map((paint, i) => (
          <Paints
            key={i}
            id={i}
            selected={paintColor}
            setSelected={setPaintColor}
            color={paint.color}
            picture={paint.picture}
          />
        ))}
      </div>
      <button disabled={furniture === "" || paintColor === ""}>Submit</button>
    </div>
  );
};

export default Inventory;
