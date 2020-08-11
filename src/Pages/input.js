import React, { useContext, useState } from "react";
import AddPicture from "../Components/AddPicture/addpicture";
import { store } from "../Services/Store";
import { db } from "../Firebase/Firebase";
import Preview from "../Components/Preview";

const Input = (props) => {
  console.log(props);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [type, setType] = useState("");
  const [price, setPrice] = useState("");
  const isInvalid = title === "" || price === "";

  const [message, setMessage] = useState("");

  const userData = useContext(store);
  const { dispatch } = userData;
  const submition = (e) => {
    // e.preventDefault();
    const arr = [];
    for (let i = 0; i < userData.state.images.length; i++) {
      arr.push(userData.state.images[i].image);
    }
    console.log(arr);
    const info = {
      ...title,
      ...description,
      ...type,
      ...price,
      images: arr,
    };
    console.log(title.title);
    db.collection("items")
      .doc(title.title)
      .set(info)
      .then((res) => {
        console.log(res);
        setMessage("Succesvol");
        dispatch({ type: "check", payload: !userData.state.check });
      });
  };
  console.log(userData);
  return (
    <div className="input">
      <form>
        <input
          type="text"
          placeholder="Titel"
          name="title"
          onChange={(e) => setTitle({ [e.target.name]: e.target.value })}
        />
        <textarea
          type="text"
          placeholder="Beschrijving"
          name="description"
          onChange={(e) => setDescription({ [e.target.name]: e.target.value })}
        />
        <input
          type="text"
          placeholder="Type kast"
          name="type"
          onChange={(e) =>
            setType({ [e.target.name]: e.target.value.toLowerCase() })
          }
        />
        <input
          type="text"
          placeholder="Prijs in euros"
          name="price"
          onChange={(e) => setPrice({ [e.target.name]: e.target.value })}
        />
      </form>
      <AddPicture />
      <Preview />
      <p className="message">{message}</p>
      <button disabled={isInvalid} onClick={submition}>
        Uploaden
      </button>
    </div>
  );
};

export default Input;
