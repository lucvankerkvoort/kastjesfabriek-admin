import React, { useContext, useEffect, useState } from "react";
import { HashRouter, Route, useHistory } from "react-router-dom";
import Navbar from "./Components/Navbar/navbar";
import Home from "./Pages/home";
import Input from "./Pages/input";
import Collection from "./Pages/collection";
import Remove from "./Components/Modal/remove";
import Edit from "./Pages/edit";
// import Help from "./Pages/help";
// import About from "./Pages/about";
import SignInPage from "./Pages/login";
import Specification from "./Pages/specification";
import "./Styles/import.scss";
import { store } from "./Services/Store";
import { db, auth } from "./Firebase/Firebase";

const App = () => {
  const [collectionTitles, setCollectionTitles] = useState({});
  const [collections, setCollections] = useState("");
  const [loggedIn, setLoggedIn] = useState(false);
  const userData = useContext(store);
  const { dispatch } = userData;
  const { remove } = userData.state;

  useEffect(
    (arr = [], test = {}, testArr = []) => {
      auth.onAuthStateChanged((authUser) => {
        console.log(authUser);
        if (authUser !== null) {
          setLoggedIn(true);
        } else {
          setLoggedIn(false);
        }
        dispatch({ type: "user", payload: authUser });
        localStorage.setItem("authUser", JSON.stringify(authUser));
      });
      db.collection("items")
        .get()
        .then((querySnapshot) => {
          querySnapshot.forEach((doc) => {
            arr.push(doc.data());
            // console.log("this is doc.data.Collection", doc.data().Collection);
            doc.data().Collection.forEach((item) => testArr.push(item));
            // testArr.push(doc.data().Collection);
            // console.log("testArr", testArr);
            // test[doc.data().Collection] = test[doc.data().type] + 1 || 1;
          });
          for (let item of testArr) {
            test[item] = test[item] + 1 || 1;
          }
          let titles = Object.keys(test);
          dispatch({ type: "info", payload: arr });
          setCollections(arr);
          setCollectionTitles(titles);
          db.collection("collection").doc("all").set(test);
        });
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [userData.state.check]
  );

  // const history = useHistory();
  return (
    <div className="App">
      {/* {console.log("info inside of App", userData.state.info)}
      {console.log("test inside of App", collectionTitles)} */}
      <HashRouter basename="/">
        <Navbar loggedIn={loggedIn} />

        {remove ? (
          <Remove
            history={useHistory}
            message="Are you sure you want to remove this item"
          />
        ) : null}
        <Route
          path="/home"
          render={(props) => (
            <Home
              collections={collections}
              collectionTitles={collectionTitles}
              {...props}
            />
          )}
        />
        <Route
          path="/collection"
          render={(props) => <Collection {...props} />}
        />
        <Route exact path="/" component={SignInPage} />
        <Route path="/edit" render={(props) => <Edit {...props} />} />
        <Route path="/spec" render={(props) => <Specification {...props} />} />
        <Route path="/input" render={(props) => <Input {...props} />} />
      </HashRouter>
    </div>
  );
};

export default App;
