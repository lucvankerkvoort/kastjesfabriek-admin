import React, { useContext, useEffect, useState } from "react";
import { HashRouter, Route, useHistory } from "react-router-dom";
import { withFirebase } from "./Firebase";
import Navbar from "./Components/Navbar/navbar";
import Home from "./Pages/home";
import Input from "./Pages/input";
import Collection from "./Pages/collection";
import Edit from "./Pages/edit";
// import Help from "./Pages/help";
// import About from "./Pages/about";
import SignInPage from "./Pages/login";
import Specification from "./Pages/specification";
import "./Styles/import.scss";
import { store } from "./Services/Store";
import { db } from "./Firebase/Firebase";

const App = ({ firebase }) => {
  const [collections, setCollections] = useState("");
  const userData = useContext(store);
  const { dispatch } = userData;

  useEffect(
    (arr = []) => {
      const { dispatch } = userData;
      db.collection("items")
        .get()
        .then((querySnapshot) => {
          querySnapshot.forEach((doc) => {
            arr.push(doc.data());
          });
          console.log("Arr", arr);
          dispatch({ type: "info", payload: arr });
          setCollections(arr);
        });
    },
    [userData.state.check]
  );
  console.log(userData);
  return (
    <div className="App">
      <HashRouter basename="/">
        <Navbar history={useHistory} />
        <Route
          path="/home"
          render={(props) => <Home collections={collections} {...props} />}
        />
        <Route path="/collection" component={Collection} />
        <Route exact path="/" component={SignInPage} />
        <Route path="/edit" render={(props) => <Edit {...props} />} />
        <Route path="/spec" render={(props) => <Specification {...props} />} />
        <Route path="/input" render={(props) => <Input {...props} />} />
      </HashRouter>
    </div>
  );
};

export default withFirebase(App);
