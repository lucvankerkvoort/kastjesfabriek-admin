import React, { useContext } from "react";
import { store } from "../../Services/Store";
import { auth } from "../../Firebase/Firebase";

const SignOutButton = () => {
  const userData = useContext(store);
  const { dispatch } = userData;
  return (
    <p
      type="button"
      onClick={() => {
        auth
          .signOut()
          .then(() => localStorage.setItem("authUser", ""))
          .then(() => dispatch({ type: "authed", payload: false }));

        // const execute = new Promise(() => firebase.doSignOut());
        // execute.then(() => );
      }}
    >
      {console.log(localStorage.getItem("authUser"))}
      Sign Out
    </p>
  );
};

export default SignOutButton;
