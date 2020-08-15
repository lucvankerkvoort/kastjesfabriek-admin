import React, { useContext } from "react";
import { store } from "../../Services/Store";

const Preview = () => {
  const userData = useContext(store);
  const { dispatch } = userData;

  const removeFromImages = (e, removableItem) => {
    e.preventDefault();
    const allPics = userData.state.images;

    for (let i = 0; i < userData.state.images.length; i++) {
      if (userData.state.images[i] === removableItem) {
        allPics.splice(i, 1);
        return dispatch({ type: "images", payload: allPics });
      }
    }
  };
  return (
    <div className="preview">
      {(userData.state.images || []).map((item, i) => {
        return (
          <>
            <div className="preview-item">
              <div
                className="preview-pic"
                key={i}
                style={{
                  background: `url(${item}) no-repeat center/contain`,
                }}
              />
              {/* <img src={item} alt="..." /> */}
              <button
                onClick={(e) => {
                  removeFromImages(e, item);
                }}
              >
                verwijderen
              </button>
            </div>
          </>
        );
      })}
    </div>
  );
};

export default Preview;
