import React, { useContext, useState, useEffect } from "react";
import AddPicture from "../Components/Picture/addpicture";
import { store } from "../Services/Store";
import { db } from "../Firebase/Firebase";
import Preview from "../Components/Preview/";

const Input = (props) => {
  const [collection, setCollection] = useState([]);
  const userData = useContext(store);
  const { dispatch } = userData;
  useEffect(() => {
    if (localStorage.getItem("authUser") === "") {
      props.history.push("/");
    }
    dispatch({ type: "images", payload: [] });

    db.collection("collection")
      .doc("all")
      .get()
      .then((doc) => {
        let obj = doc.data();
        console.log(obj);
        setCollection(Object.keys(obj));
      });
  }, []);

  console.log(userData);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [type, setType] = useState("");
  const [price, setPrice] = useState("");
  const [sold, setSold] = useState(false);
  const [newCollection, setNewCollection] = useState("");
  const [images, setImages] = useState(false);
  const isInvalid =
    images === false || title === "" || price === "" || sold === "";

  const imageBeenSet = (input) => {
    setImages(input);
  };
  async function size() {
    let size = db
      .collection("items")
      .get()
      .then((query) => (size = query.size));
    return size;
  }

  const [message, setMessage] = useState("");

  async function submition(e) {
    let dbSize = await size();

    const dbNumber = (dbSize + 1).toString();
    const info = {
      id: "KF" + dbNumber,
      title,
      description,
      type: newCollection ? newCollection : type,
      price,
      sold,
      images: userData.state.images,
    };

    db.collection("items")
      .doc("KF" + dbNumber)
      .set(info)
      .then((res) => {
        setMessage("Succesvol");
        dispatch({ type: "check", payload: !userData.state.check });
      });
    // .then(() => window.location.reload());
  }

  console.log(userData.state.images);
  return (
    <div className="input">
      <AddPicture setImage={() => imageBeenSet} />
      <Preview setImage={() => imageBeenSet} />

      <form>
        <div className="form-group">
          <label for="titel">Titel</label>
          <input
            type="text"
            className="form-control"
            id="titel"
            aria-describedby="titel"
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>

        <div class="form-group">
          <label for="description">Beschrijving</label>
          <textarea
            class="form-control"
            id="description"
            rows="3"
            onChange={(e) => setDescription(e.target.value)}
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
              return <option>{option}</option>;
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
              onChange={(e) => setNewCollection(e.target.value)}
            />
          </div>
        ) : null}

        <div className="form-group">
          <label for="prijs">Prijs in Euros</label>
          <input
            type="text"
            defaultValue="€"
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
