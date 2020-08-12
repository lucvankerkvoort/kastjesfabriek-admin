import React from "react";
import { Link } from "react-router-dom";
import image from "../../Images/images";
import SignOutButton from "../SignOutButton";
const Navbar = ({ history }) => {
  // console.log();
  return (
    <div className="navbar">
      <div className="logo">
        <Link to="/" style={{ textDecoration: "none", color: "black" }}>
          <img src={image.Logo} alt="logo" width="75px" height="75px" />
        </Link>
      </div>
      <div className="navbar-items">
        <Link to="/home" style={{ textDecoration: "none", color: "black" }}>
          <p> Assortiment </p>
        </Link>
        <Link to="/input" style={{ textDecoration: "none", color: "black" }}>
          <p>Toevoegen</p>
        </Link>
        {localStorage.getItem("authUser") !== "" ? (
          <Link to="/" style={{ textDecoration: "none", color: "black" }}>
            <SignOutButton />
          </Link>
        ) : null}
      </div>
    </div>
  );
};

export default Navbar;
