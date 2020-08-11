import React, { useContext, useEffect, useState } from "react";
import { HashRouter, Route } from "react-router-dom";
import { withFirebase } from "./Firebase";
import Navbar from "./Components/Navbar/navbar";
import Home from "./Pages/home";
import Input from "./Pages/input";
import Collection from "./Pages/collection";
// import Help from "./Pages/help";
import Shop from "./Pages/shop";
// import About from "./Pages/about";
import SignInPage from "./Pages/login";
import Specification from "./Pages/specification";
import "./Styles/import.scss";
import { store } from "./Services/Store";
import { db } from "./Firebase/Firebase";

const App = () => {
  const [collections, setCollections] = useState("");
  const userData = useContext(store);

  useEffect((arr = []) => {
    const { dispatch } = userData;
    db.collection("items")
      .get()
      .then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
          arr.push(doc.data());
        });
        dispatch({ type: "info", payload: arr });
        setCollections(arr);
      });
  }, []);
  console.log(userData);
  return (
    <div className="App">
      <HashRouter basename="/">
        <Navbar />
        <Route
          exact
          path="/"
          render={() => <Home collections={collections} />}
        />
        <Route path="/collection" component={Collection} />
        {/* <Route path="/help" component={Help} /> */}
        {/* <Route path="/about" component={About} /> */}
        <Route path="/shop" component={Shop} />
        <Route path="/login" component={SignInPage} />
        <Route path="/spec" render={(props) => <Specification {...props} />} />
        <Route path="/input" render={(props) => <Input {...props} />} />
      </HashRouter>
    </div>
  );
};

export default withFirebase(App);
