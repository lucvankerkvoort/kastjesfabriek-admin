import React, { useContext, useState } from "react";
import AddPicture from "../Components/Picture/addpicture";
import { store } from "../Services/Store";
import { db } from "../Firebase/Firebase";
import EditPreview from "../Components/Preview/editPreview";

const Input = (props) => {
  const userData = useContext(store);
  const { dispatch } = userData;
  let { edit } = userData.state;

  console.log(edit);
  if (!edit) {
    edit = JSON.parse(localStorage.getItem("edit"));
  }
  console.log(props);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [type, setType] = useState("");
  const [price, setPrice] = useState("");
  const [sold, setSold] = useState(false);
  //   const isInvalid = title === "" || price === "" || sold === "";

  //   async function size() {
  //     let size = db
  //       .collection("items")
  //       .get()
  //       .then((query) => (size = query.size));
  //     return size;
  //   }

  const [message, setMessage] = useState("");

  async function submition(e) {
    const info = {
      id: edit.id,
      title: !title ? edit.title : title,
      description: !description ? edit.description : description,
      type: !type ? edit.type : type,
      price: !price ? edit.price : price,
      sold,
      images: userData.state.images,
    };
    // const dbNumber = (dbSize + 1).toString();
    console.log(info);
    db.collection("items")
      .doc(edit.id)
      .set(info)
      .then((res) => {
        console.log("Succesvol upload to database");
        setMessage("Succesvol");
        dispatch({ type: "check", payload: !userData.state.check });
      })
      .then(() => props.history.push("/home"));
  }
  console.log(userData);
  return (
    <div className="input">
      <form>
        <input
          type="text"
          defaultValue={edit.title}
          placeholder="Titel"
          name="title"
          onChange={(e) => setTitle(e.target.value)}
        />
        <textarea
          type="text"
          defaultValue={edit.description}
          placeholder="Beschrijving"
          name="description"
          onChange={(e) => setDescription(e.target.value)}
        />
        <input
          type="text"
          defaultValue={edit.type}
          placeholder="Type kast"
          name="type"
          onChange={(e) =>
            e.target.value === ""
              ? setType(e.target.defaultValue)
              : setType(e.target.value.toLowerCase())
          }
        />
        <input
          type="text"
          defaultValue={edit.price}
          placeholder="Prijs in euros"
          name="price"
          onChange={(e) =>
            e.target.value === ""
              ? setPrice(e.target.defaultValue)
              : setPrice(e.target.value)
          }
        />
        <select
          placeholder="Verkocht"
          id="sold"
          defaultValue={edit.sold}
          name="sold"
          onChange={(e) => setSold(e.target.value === "true" ? true : false)}
        >
          <option value="">...</option>
          <option value={true}>Ja</option>
          <option value={false}>Nee</option>
        </select>
      </form>
      <AddPicture />
      <EditPreview id={edit.id} />
      <p className="message">{message}</p>
      <button onClick={submition}>Uploaden</button>
    </div>
  );
};

export default Input;
