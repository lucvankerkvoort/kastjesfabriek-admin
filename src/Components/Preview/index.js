import React, { useContext, useState } from "react";
import { storage } from "../../Firebase/Firebase";
import { store } from "../../Services/Store";

const Preview = () => {
  const userData = useContext(store);
  const { dispatch } = userData;

  const removeFromImages = (removableItem) => {
    console.log(removableItem);
    console.log(userData.state.images);
    const allPics = userData.state.images;

    for (let i = 0; i < userData.state.images.length; i++) {
      if (userData.state.images[i].image === removableItem) {
        allPics.splice(i, 1);
        return dispatch({ type: "images", payload: allPics });
      }
    }
  };
  console.log(userData.state.images);
  return (
    <>
      {(userData.state.images || []).map((item) => {
        console.log();
        return (
          <>
            <img src={item.image} alt="..." />
            <button
              onClick={(e) => {
                e.preventDefault();
                console.log(item);
                storage
                  .ref(`/images/${item.file}`)
                  .delete()
                  .then((res) => console.log(res));
                removeFromImages(item.image);
                // setCheck(!check);
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

export default Preview;
