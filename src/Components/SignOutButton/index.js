import React, { useContext } from "react";
import { store } from "../../Services/Store";

import { withFirebase } from "../../Firebase";

const SignOutButton = ({ firebase }) => {
  const userData = useContext(store);
  const { dispatch } = userData;
  return (
    <p
      type="button"
      onClick={() => {
        firebase
          .doSignOut()
          .then(() => localStorage.setItem("authUser", null))
          .then(() => dispatch({ type: "authed", payload: false }));

        // const execute = new Promise(() => firebase.doSignOut());
        // execute.then(() => );
      }}
    >
      Sign Out
    </p>
  );
};

export default withFirebase(SignOutButton);
