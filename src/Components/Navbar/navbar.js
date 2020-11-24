import React, { useEffect, useState, useContext } from "react";
import { Link } from "react-router-dom";
import { store } from "../../Services/Store";
import image from "../../Images/images";
import SignOutButton from "../SignOutButton";
const Navbar = ({ loggedIn = false }) => {
  return (
    <div className="navbar">
      <div className="logo">
        <Link to="/home" style={{ textDecoration: "none", color: "black" }}>
          <img src={image.Logo} alt="logo" width="75px" height="75px" />
        </Link>
      </div>

      {loggedIn ? (
        <div className="navbar-items">
          <Link to="/home" style={{ textDecoration: "none", color: "black" }}>
            <p> Assortiment </p>
          </Link>
          <Link to="/input" style={{ textDecoration: "none", color: "black" }}>
            <p>Toevoegen</p>
          </Link>
          <Link to="/" style={{ textDecoration: "none", color: "black" }}>
            <SignOutButton />
          </Link>
          <Link
            to="/add-inventory"
            style={{ textDecoration: "none", color: "black" }}
          >
            Voorraad Toevoegen
          </Link>
        </div>
      ) : null}
    </div>
  );
};

export default Navbar;
