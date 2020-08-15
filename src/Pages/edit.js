import React, { useContext, useState, useEffect } from "react";
import AddPicture from "../Components/Picture/addpicture";
import { store } from "../Services/Store";
import { db } from "../Firebase/Firebase";
import EditPreview from "../Components/Preview/editPreview";

const Input = (props) => {
  const [collection, setCollection] = useState([]);
  useEffect(() => {
    if (localStorage.getItem("authUser") === "") {
      props.history.push("/");
    }

    db.collection("collection")
      .doc("all")
      .get()
      .then((doc) => {
        let obj = doc.data();
        console.log(obj);
        setCollection(Object.keys(obj));
      });
  }, []);

  const userData = useContext(store);
  const { dispatch } = userData;
  let { edit } = userData.state;

  if (!edit) {
    edit = JSON.parse(localStorage.getItem("edit"));
  }
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [type, setType] = useState("");
  const [price, setPrice] = useState("");
  const [sold, setSold] = useState(false);

  const [message, setMessage] = useState("");

  const isInvalid = type === "";
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
  return (
    <div className="input">
      <AddPicture />
      <EditPreview id={edit.id} />
      <form>
        <div className="form-group">
          <label for="titel">Titel</label>
          <input
            type="text"
            defaultValue={edit.title}
            className="form-control"
            id="titel"
            aria-describedby="titel"
            onChange={(e) =>
              setTitle(
                e.target.value === "" ? e.target.defaultValue : e.target.value
              )
            }
          />
        </div>

        <div class="form-group">
          <label for="description">Beschrijving</label>
          <textarea
            class="form-control"
            defaultValue={edit.description}
            id="description"
            rows="3"
            onChange={(e) =>
              setDescription(
                e.target.value === "" ? e.target.defaultValue : e.target.value
              )
            }
          ></textarea>
        </div>

        <div className="form-group">
          <label for="exampleFormControlSelect1">Collectie</label>
          <select
            className="form-control"
            id="exampleFormControlSelect1"
            onChange={(e) => setType(e.target.value.toLowerCase())}
          >
            <option>...</option>
            {collection.map((option) => {
              return <option value={option}>{option}</option>;
            })}
            <option>nieuwe collectie toevoegen</option>
          </select>
        </div>
        {type === "nieuwe collectie toevoegen" ? (
          <div className="form-group">
            <label for="newCollection">Nieuwe Collectie</label>
            <input
              type="text"
              className="form-control"
              id="newCollection"
              onChange={(e) => setCollection(e.target.value)}
            />
          </div>
        ) : null}

        <div className="form-group">
          <label for="prijs">Prijs in Euros</label>
          <input
            type="text"
            defaultValue={edit.price ? edit.price : "€"}
            className="form-control"
            id="titel"
            onChange={(e) => setPrice(e.target.value)}
          />
        </div>
        <div className="form-group">
          <label for="sold">Verkocht?</label>
          <select
            className="form-control"
            id="sold"
            onChange={(e) => setSold(e.target.value === "true" ? true : false)}
          >
            <option value="">...</option>
            <option value={true}>Ja</option>
            <option value={false}>Nee</option>
          </select>
        </div>
        <p>{message}</p>
        <button
          disabled={isInvalid}
          onClick={submition}
          className="btn btn-primary"
        >
          Uploaden
        </button>
      </form>
    </div>
  );
};

export default Input;
