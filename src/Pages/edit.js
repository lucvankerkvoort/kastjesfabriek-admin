import React, { useContext, useState, useEffect } from "react";
import AddPicture from "../Components/Picture/addpicture";
import { store } from "../Services/Store";
import { db } from "../Firebase/Firebase";
import EditPreview from "../Components/Preview/editPreview";

const Input = (props) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [type, setType] = useState("");
  const [price, setPrice] = useState("");
  const [sold, setSold] = useState(false);
  const [addCollection, setAddCollection] = useState(false);
  const [itemCollection, setItemCollections] = useState([]);
  const [newCollectionName, setNewCollection] = useState("");
  const [images, setImages] = useState(false);
  const [collection, setCollection] = useState([]);

  const userData = useContext(store);
  const { dispatch } = userData;
  useEffect(() => {
    if (localStorage.getItem("authUser") === "") {
      props.history.push("/");
    }

    db.collection("collection")
      .doc("all")
      .get()
      .then((doc) => {
        let obj = doc.data();
        console.log("object", obj);
        setCollection(Object.keys(obj));
      });
  }, []);

  let { edit } = userData.state;

  if (!edit) {
    edit = JSON.parse(localStorage.getItem("edit"));
  }

  console.log(edit);
  const [message, setMessage] = useState("");

  async function submition(e) {
    e.preventDefault();
    const info = {
      id: edit.id,
      title: !title ? edit.title : title,
      description: !description ? edit.description : description,
      Collection: !newCollectionName
        ? [...edit.Collection, ...itemCollection]
        : [...edit.Collection, ...itemCollection, newCollectionName],
      price: !price ? edit.price : price,
      sold,
      images: userData.state.images,
    };
    console.log("info in Edit", info);
    // db.collection("items")
    //   .doc(edit.id)
    //   .set(info)
    //   .then((res) => {
    //     console.log("Succesvol upload to database");
    //     setMessage("Succesvol");
    //     dispatch({ type: "check", payload: !userData.state.check });
    //   })
    //   .then(() => props.history.push("/home"));
  }
  return (
    <div className="input">
      <AddPicture setImage={(input) => setImages(input)} />
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
              onChange={(e) => setNewCollection(e.target.value)}
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
        <button onClick={(e) => submition(e)} className="btn btn-primary">
          Uploaden
        </button>
      </form>
    </div>
  );
};

export default Input;
