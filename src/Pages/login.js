import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import { compose } from "recompose";
import { store } from "../Services/Store";
import { auth } from "../Firebase/Firebase";

const SignInPage = () => (
  <div className="signin">
    <h1>SignIn</h1>
    <SignInForm />
  </div>
);

const INITIAL_STATE = {
  email: "",
  password: "",
  error: null,
};

class SignInFormBase extends Component {
  constructor(props) {
    super(props);
    this.state = { ...INITIAL_STATE };
  }

  static contextType = store;

  onSubmit = (event) => {
    const { dispatch } = this.context;
    const { email, password } = this.state;

    auth
      .signInWithEmailAndPassword(email, password)
      .then((user) => {
        this.setState({ ...INITIAL_STATE });
        console.log("user inside login",user)
        localStorage.setItem("authUser", JSON.stringify(user.user));
      })
      .then((data) => {
        console.log(data)
        dispatch({ type: "authed", payload: true });
        this.props.history.push("/home");
      })
      .catch((error) => {
        this.setState({ error });
      });

    event.preventDefault();
  };

  onChange = (event) => {
    this.setState({ [event.target.name]: event.target.value });
  };

  render() {
    const { email, password, error } = this.state;

    const isInvalid = password === "" || email === "";

    return (
      <form onSubmit={this.onSubmit}>
        <input
          name="email"
          value={email}
          onChange={this.onChange}
          type="text"
          placeholder="Email Address"
        />
        <input
          name="password"
          value={password}
          onChange={this.onChange}
          type="password"
          placeholder="Password"
        />
        <button disabled={isInvalid} type="submit">
          Sign In
        </button>

        {error && <p>{error.message}</p>}
      </form>
    );
  }
}

const SignInForm = compose(withRouter)(SignInFormBase);

export default SignInPage;

export { SignInForm };
