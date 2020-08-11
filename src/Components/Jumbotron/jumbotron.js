import React from "react";

const Jumbotron = ({ title, backgroundPicture, text }) => {
  return (
    <>
      <div className="jumbotron-content">
        <h1>{title}</h1>
        <p>{text}</p>
      </div>
      <div
        className="jumbotron"
        style={{
          background: backgroundPicture ? `url(${backgroundPicture})` : "white",
          backgroundPosition: "center",
        }}
      >
        <div className="layer" />
      </div>
    </>
  );
};

export default Jumbotron;
