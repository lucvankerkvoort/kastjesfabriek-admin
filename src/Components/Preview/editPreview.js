import React, { useContext, useEffect } from "react";
import { db } from "../../Firebase/Firebase";
import { store } from "../../Services/Store";

const EditPreview = ({ id }) => {
  const userData = useContext(store);
  const { dispatch } = userData;

  useEffect(() => {
    const arr = [];
    db.collection("items")
      .where("id", "==", id)
      .get()
      .then((query) => query.forEach((doc) => arr.push(...doc.data().images)))
      .then(() => {
        dispatch({
          type: "images",
          payload:
            userData.state.images === []
              ? [...userData.state.images, ...arr]
              : [...arr],
        });
      });
  }, []);

  const removeFromImages = (e, removableItem) => {
    e.preventDefault();

    for (let i = 0; i < userData.state.images.length; i++) {
      if (userData.state.images[i] === removableItem) {
        userData.state.images.splice(i, 1);
        return dispatch({ type: "images", payload: userData.state.images });
      }
    }
  };
  return (
    <>
      {(userData.state.images || []).map((item, i) => {
        return (
          <>
            <img src={item} key={i} alt="..." />
            <button
              key={"l" + i}
              onClick={(e) => {
                removeFromImages(e, item);
              }}
            >
              verwijderen
            </button>
          </>
        );
      })}
    </>
  );
};

export default EditPreview;
