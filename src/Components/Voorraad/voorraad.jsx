import React, { useContext, useState } from "react";
import AddPicture from "../Picture/addpicture";
import Preview from "../Preview/index";
import { store } from "../../Services/Store";
import { db } from "../../Firebase/Firebase";
const Voorraad = () => {
  const [images, setImages] = useState(false);
  const [title, setTitle] = useState("");
  const [price, setPrice] = useState("");
  const [message, setMessage] = useState("");
  const userData = useContext(store);
  const { dispatch } = userData;
  async function size() {
    let size = db
      .collection("voorraad")
      .get()
      .then((query) => (size = query.size));
    return size;
  }

  const handleSubmit = async () => {
    let dbSize = await size();
    let dbNumber = (dbSize + 1).toString();
    const { images } = userData.state;
    const input = {
      images,
      title,
      price,
    };

    console.log("check", input);

    db.collection("voorraad")
      .doc(dbNumber)
      .set(input)
      .then((res) => {
        setMessage("Succesvol");
        dispatch({ type: "check", payload: !userData.state.check });
      });
  };
  const imageBeenSet = (input) => {
    setImages(input);
  };
  return (
    <div>
      <form>
        <AddPicture setImage={(input) => setImages(input)} />
        <Preview setImage={() => imageBeenSet} />
        <input placeholder="Titel" onChange={(e) => setTitle(e.target.value)} />
        <input placeholder="Prijs" onChange={(e) => setPrice(e.target.value)} />
      </form>
      <button onClick={handleSubmit}>Submit</button>
      {message ? <p>{message}</p> : null}
    </div>
  );
};

export default Voorraad;
