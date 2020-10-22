/* eslint-disable react-hooks/exhaustive-deps */
import React, { useContext, useState, useEffect } from "react";
import AddPicture from "../Components/Picture/addpicture";
import { store } from "../Services/Store";
import { db } from "../Firebase/Firebase";
import Preview from "../Components/Preview/";

const Input = (props) => {
  const [collection, setCollection] = useState([]);
  const [type, setType] = useState({});
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
        console.log("object", obj);
        setCollection(Object.keys(obj));
        setType(obj);
      });
  }, []);

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [sold, setSold] = useState(false);
  const [newCollectionName, setNewCollectionName] = useState("");
  const [addCollection, setAddCollection] = useState(false);
  const [itemCollection, setItemCollections] = useState([]);
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
    e.preventDefault();
    let dbSize = await size();

    const dbNumber = (dbSize + 1).toString();
    const info = {
      id: "KF" + dbNumber,
      title,
      description,
      Collection: [...itemCollection, newCollectionName],
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

  console.log(itemCollection);
  return (
    <div className="input">
      {console.log("itemCollection", itemCollection)}
      <AddPicture setImage={(input) => setImages(input)} />
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
          {collection.map((option) => (
            <div class="form-check">
              <input
                class="form-check-input"
                type="checkbox"
                name={option}
                id="defaultCheck1"
                onChange={(e) => {
                  console.log("e", e.target);
                  const { name, checked } = e.target;
                  console.log(checked);
                  if (checked) {
                    setItemCollections([...itemCollection, name]);
                  } else {
                    let removedArray = itemCollection;
                    let removeableItem = removedArray.indexOf(name);
                    let remove = removedArray.splice(removeableItem, 1);
                    console.log("number", removeableItem);
                    console.log("removed array", remove);
                    console.log(removedArray);
                    setItemCollections(removedArray);
                  }
                }}
              />
              <label class="form-check-label" for="defaultCheck1">
                {option}
              </label>
            </div>
          ))}

          <div class="form-check">
            <input
              class="form-check-input"
              type="checkbox"
              value="nieuwe collectie toevoegen"
              id="defaultCheck1"
              onChange={(e) => setAddCollection(e.target.checked)}
            />
            <label class="form-check-label" for="defaultCheck1">
              nieuwe collectie toevoegen
            </label>
          </div>
        </div>
        {addCollection ? (
          <div className="form-group">
            <label for="newCollection">Nieuwe Collectie</label>
            <input
              type="text"
              className="form-control"
              id="newCollection"
              onChange={(e) => setNewCollectionName(e.target.value)}
            />
          </div>
        ) : null}

        <div className="form-group">
          <label for="prijs">Prijs in Euros</label>
          <div class="input-group">
            <div class="input-group-prepend">
              <div class="input-group-text">€</div>
            </div>
            <input
              type="text"
              class="form-control"
              id="inlineFormInputGroupUsername"
              placeholder="Prijs"
              onChange={(e) => setPrice(e.target.value)}
            />
          </div>
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
