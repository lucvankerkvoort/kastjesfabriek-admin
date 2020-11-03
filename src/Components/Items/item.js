import React, { useContext, useState, useEffect } from "react";
import { store } from "../../Services/Store";
import { Link } from "react-router-dom";
import { db } from "../../Firebase/Firebase";
import SoldBanner from "../SoldBanner/soldBanner";

const Items = ({
  id,
  title,
  price,
  pics,
  sold,
  description,
  Collection,
  history,
}) => {
  const [user, setUser] = useState("");
  const userData = useContext(store);
  const { dispatch } = userData;
  const props = {
    title,
    price,
    pics,
    description,
    Collection,
  };

  useEffect(() => {
    setUser(localStorage.getItem("authUser"));
  }, [userData.state.authed]);

  const removeItem = () => {
    db.collection("items")
      .doc(id)
      .delete()
      .then(() => {
        setTimeout(
          () =>
            dispatch({
              type: "check",
              payload: !userData.state.check,
            }),
          1000
        );
      });
  };

  return (
    <div className="item">
      <Link
        style={{ textDecoration: "none", color: "black" }}
        onClick={() => {
          dispatch({ type: "current", payload: props });
          localStorage.setItem("current", JSON.stringify(props));
        }}
        to="/spec"
      >
        <div className="picture">
          <div
            style={{
              background: `url(${pics[0]})`,
            }}
          />
        </div>
      </Link>

      <div className="item-title">
        <h1>{title}</h1>
      </div>

      {sold ? (
        <SoldBanner />
      ) : (
        <div className="price">
          <p>{price},00</p>
        </div>
      )}
      {user !== "" ? (
        <div
          className="remove"
          onClick={() => {
            dispatch({ type: "id-remove", payload: id });
            dispatch({ type: "remove", payload: true });
          }}
        >
          X
        </div>
      ) : null}
      {user !== "" ? (
        <div
          className="edit"
          onClick={() => {
            db.collection("items")
              .doc(id)
              .get()
              .then((doc) => {
                dispatch({ type: "edit", payload: doc.data() });
                localStorage.setItem("edit", JSON.stringify(doc.data()));
              })
              .then(() => {
                history.push("/edit");
              });
          }}
        >
          edit
        </div>
      ) : null}
    </div>
  );
};

export default Items;
