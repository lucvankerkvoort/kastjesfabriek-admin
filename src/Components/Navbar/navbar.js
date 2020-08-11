import React, { useEffect, useState, useContext } from "react";
import { Link } from "react-router-dom";
import image from "../../Images/images";
import SignOutButton from "../SignOutButton";
import { store } from "../../Services/Store";
const Navbar = () => {
  const [user, setUser] = useState("");
  const userData = useContext(store);

  useEffect(() => {
    setUser(localStorage.getItem("authUser"));
  }, [userData.state.authed]);

  return (
    <div className="navbar">
      <div className="logo">
        <Link to="/" style={{ textDecoration: "none", color: "black" }}>
          <img src={image.Logo} alt="logo" width="75px" height="75px" />
        </Link>
      </div>
      <div className="navbar-items">
        <Link to="/" style={{ textDecoration: "none", color: "black" }}>
          <p> Home </p>
        </Link>
        <Link to="/shop" style={{ textDecoration: "none", color: "black" }}>
          <p> Shop </p>
        </Link>
        {user !== "null" ? <SignOutButton /> : null}
        {user !== "null" ? (
          <Link to="/input" style={{ textDecoration: "none", color: "black" }}>
            <p>Toevoegen</p>
          </Link>
        ) : null}
        {/* <Link to="/about" style={{ textDecoration: "none", color: "black" }}>
          <p> About </p>
        </Link>
        <Link to="/help" style={{ textDecoration: "none", color: "black" }}>
          <p> Help </p>
        </Link> */}
      </div>
    </div>
  );
};

export default Navbar;
