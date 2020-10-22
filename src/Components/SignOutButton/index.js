import React, { useContext } from "react";
import { store } from "../../Services/Store";
import {auth} from "../../Firebase/Firebase"

const SignOutButton = () => {
  const userData = useContext(store);
  const { dispatch } = userData;
  return (
    <p
      type="button"
      onClick={() => {
        auth
          .SignOut()
          .then(() => localStorage.setItem("authUser", ""))
          .then(() => dispatch({ type: "authed", payload: false }));

        // const execute = new Promise(() => firebase.doSignOut());
        // execute.then(() => );
      }}
    >
      Sign Out
    </p>
  );
};

export default SignOutButton;
