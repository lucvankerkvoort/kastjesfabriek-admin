import React, { useContext, useState } from "react";
import AddPicture from "../Components/Picture/addpicture";
import { store } from "../Services/Store";
import { db } from "../Firebase/Firebase";
import Preview from "../Components/Preview/";

const Input = (props) => {
  console.log(props);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [type, setType] = useState("");
  const [price, setPrice] = useState("");
  const [sold, setSold] = useState(false);
  const isInvalid = title === "" || price === "" || sold === "";

  async function size() {
    let size = db
      .collection("items")
      .get()
      .then((query) => (size = query.size));
    return size;
  }

  const [message, setMessage] = useState("");

  const userData = useContext(store);
  const { dispatch } = userData;

  async function submition(e) {
    let dbSize = await size();

    const dbNumber = (dbSize + 1).toString();
    console.log(dbNumber);
    const info = {
      id: "KF" + dbNumber,
      title,
      description,
      type,
      price,
      sold,
      images: userData.state.images,
    };

    console.log(info);

    db.collection("items")
      .doc("KF" + dbNumber)
      .set(info)
      .then((res) => {
        console.log("Succesvol upload to database");
        setMessage("Succesvol");
        dispatch({ type: "check", payload: !userData.state.check });
      })
      .then(() => window.location.reload());
  }
  // console.log(userData);
  return (
    <div className="input">
      <form>
        <input
          type="text"
          placeholder="Titel"
          name="title"
          onChange={(e) => setTitle(e.target.value)}
        />
        <textarea
          type="text"
          placeholder="Beschrijving"
          name="description"
          onChange={(e) => setDescription(e.target.value)}
        />
        <input
          type="text"
          placeholder="Type kast"
          name="type"
          onChange={(e) => setType(e.target.value.toLowerCase())}
        />
        <input
          type="text"
          placeholder="Prijs in euros"
          name="price"
          onChange={(e) => setPrice(e.target.value)}
        />
        <select
          placeholder="Verkocht"
          id="sold"
          name="sold"
          onChange={(e) => setSold(e.target.value)}
        >
          <option value="">...</option>
          <option value={true}>Ja</option>
          <option value={false}>Nee</option>
        </select>
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