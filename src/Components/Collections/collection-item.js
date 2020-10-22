import React, { useEffect, useState, useContext } from "react";
import { Link } from "react-router-dom";
import { db } from "../../Firebase/Firebase";
import { store } from "../../Services/Store";

const CollectionItem = ({ title }) => {
  const userData = useContext(store);
  const { dispatch } = userData;
  const [images, setImages] = useState("");
  const [info, setInfo] = useState("");
  const collectionTitle = () => {
    let toArray = [...title];
    const uppercase = toArray.shift();
    return uppercase.toUpperCase() + toArray.join("");
  };

  useEffect(() => {
    const imgArr = [];
    const infoArr = [];
    if (title) {
      db.collection("items")
        .where("Collection", "array-contains", title)
        .get()
        .then(function (querySnapshot) {
          querySnapshot.forEach(function (doc) {
            // console.log("docData inside Collection-item", doc.data());
            infoArr.push(doc.data());
            // doc.data() is never undefined for query doc snapshots
            imgArr.push(...doc.data().images);
          });
          setImages(imgArr);
          setInfo(infoArr);
        });
    }
  }, []);
  return (
    <Link
      to="/collection"
      onClick={() => dispatch({ type: "collection", payload: info })}
    >
      {/* {console.log("this is info inside colleciton item", info)}
      {console.log("this is images inside colleciton item", images)} */}
      <div className="collection-item">
        <h5 className="collection-item-title">{collectionTitle()}</h5>
        <div
          className="collection-item-background"
          style={{
            background: images ? `url(${images[0]})` : "black",
          }}
        >
          <div className="collection-layer" />
        </div>
      </div>
    </Link>
  );
};

export default CollectionItem;
