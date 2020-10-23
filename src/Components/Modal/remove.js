import React, { useContext } from "react";
import { store } from "../../Services/Store";
import { useHistory } from "react-router-dom";
import { db } from "../../Firebase/Firebase";

const Remove = ({ message }) => {
  const userData = useContext(store);
  const { dispatch } = userData;
  const { removeId } = userData.state;
  console.log(userData.state.current);
  const history = useHistory();

  console.log("useHistory", history);
  // console.log("history inside of the modal", history().push("/home"));
  return (
    <div className="modal-case">
      <div className="modal-item">
        <p>{message}</p>
        <p
          className="close-modal"
          onClick={() => dispatch({ type: "remove", payload: false })}
        >
          close
        </p>
        <button
          onClick={() => {
            db.collection("items")
              .doc(removeId)
              .delete()
              .then(() => {
                dispatch({ type: "remove", payload: false });
                setTimeout(
                  () =>
                    dispatch({
                      type: "check",
                      payload: !userData.state.check,
                    }),
                  1000
                );
                history.push("/home");
              });
          }}
        >
          Remove
        </button>
      </div>
    </div>
  );
};

export default Remove;
