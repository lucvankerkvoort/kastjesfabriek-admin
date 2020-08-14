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
  type,
  history,
}) => {
  const [user, setUser] = useState("");
  const [edit, setEdit] = useState(false);
  const userData = useContext(store);
  const { dispatch } = userData;
  const props = {
    title,
    price,
    pics,
    description,
    type,
  };

  useEffect(() => {
    setUser(localStorage.getItem("authUser"));
  }, [userData.state.authed]);

  console.log(id);
  // console.log(user ? console.log("its on") : console.log("its off"));
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

      {sold ? <SoldBanner /> : null}

      <div className="item-title">
        <h1>{title}</h1>
      </div>
      <div className="price">
        <p>€{price},00</p>
      </div>
      {user !== "" ? (
        <div
          className="remove"
          onClick={() =>
            db
              .collection("items")
              .doc(id)
              .delete()
              .then(() => {
                setTimeout(
                  () =>
                    dispatch({ type: "check", payload: !userData.state.check }),
                  1000
                );
              })
              .then(() => window.location.reload())
          }
        >
          X
        </div>
      ) : null}
      {user !== "" ? (
        // <Link to="/edit">
        <div
          className="edit"
          onClick={() => {
            db.collection("items")
              .doc(id)
              .get()
              .then((doc) => {
                console.log(doc.data());
                dispatch({ type: "edit", payload: doc.data() });
                localStorage.setItem("edit", JSON.stringify(doc.data()));
              })
              .then(() => {
                console.log(userData.state.edit);
                history.push("/edit");
              });
          }}
        >
          edit
        </div>
      ) : // </Link>
      null}
    </div>
  );
};

export default Items;
