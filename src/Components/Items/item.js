import React, { useContext, useState, useEffect } from "react";
import { store } from "../../Services/Store";
import { Link } from "react-router-dom";
import { db } from "../../Firebase/Firebase";
import SoldBanner from "../SoldBanner/soldBanner";

const Items = ({ title, price, pics, sold, description }) => {
  const [user, setUser] = useState("");
  const userData = useContext(store);
  const { dispatch } = userData;
  const props = {
    title,
    price,
    pics,
    description,
  };

  useEffect(() => {
    setUser(localStorage.getItem("authUser"));
  }, [userData.state.authed]);

  // console.log(user);
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
      <div className="item-title">
        <h1>{title}</h1>
      </div>
      {sold ? <SoldBanner /> : null}
      <div className="price">
        <p>€{price},00</p>
      </div>
      {user !== "null" ? (
        <div
          className="remove"
          onClick={() =>
            db
              .collection("items")
              .doc(title)
              .delete()
              .then(() => {
                console.log("I Run 2");
                setTimeout(
                  () =>
                    dispatch({ type: "check", payload: !userData.state.check }),
                  1000
                );
              })
          }
        >
          X
        </div>
      ) : null}
    </div>
  );
};

export default Items;
