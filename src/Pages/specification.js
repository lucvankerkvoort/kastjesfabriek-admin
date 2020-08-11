import React, { useContext, useState } from "react";
import { store } from "../Services/Store";
import Gallery from "./gallery";
import images from "../Images/images";
import emailjs from "emailjs-com";

const Specification = (props) => {
  const [email, setEmail] = useState("");
  const [item, setItem] = useState("");
  const [message, setMessage] = useState("");

  const handleEmail = (e) => {
    e.preventDefault();

    const templateParams = {
      from_name: item + " (" + email + ")",
      to_name: "corindafokkema@hotmail.com",
      feedback: message,
    };
    emailjs
      .send("outlook", "kastjesfabriek", templateParams, "corinda_fokkema")
      .then(
        function (response) {
          console.log("SUCCESS!", response.status, response.text);
        },
        function (err) {
          console.log("Your message was not able to be sent", err);
        }
      );
    setEmail("");
    setMessage("");
    setItem("");
  };
  const goBack = props.history.goBack;
  const userData = useContext(store);

  if (!userData.state.current) {
    userData.state.current = JSON.parse(localStorage.getItem("current"));
  }
  const { pics, title, description, price } = userData.state.current;

  console.log(userData.state.current);
  return (
    <div className="specification">
      <div className="title-spec">
        <img
          src={images.leftArrow}
          alt="left arrow"
          width="30px"
          height="30px"
          className="back-to-shopping"
          onClick={() => goBack()}
        />
        <h1>{title}</h1>
      </div>
      <div className="product-spec">
        <div className="picture-spec">
          <Gallery picture={pics} />
        </div>
        <div className="detail-spec">
          <p>Omschrijving: {description}</p>
          <p>Prijs: €{price},-</p>
          <p>Je kan deze producten kopen via</p>
          <form className="sending-inquiry" onSubmit={handleEmail}>
            <input
              name="email"
              type="email"
              placeholder="E-mail adres"
              onChange={(e) => setEmail({ [e.target.name]: e.target.value })}
            />
            <input
              name="title"
              type="text"
              value={`Aangaande ${title}`}
              onChange={(e) => setItem({ [e.target.name]: e.target.value })}
            />
            <textarea
              name="message"
              type="text"
              placeholder="Type hier je bericht"
              onChange={(e) => setMessage({ [e.target.name]: e.target.value })}
            />
            <button>Verzenden</button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Specification;
