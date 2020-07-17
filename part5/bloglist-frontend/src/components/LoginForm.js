import React from "react";
import PropTypes from "prop-types";

import Notification from "./Notification";

const LoginForm = props => (
  <>
    <h2>Login form</h2>
    <Notification message={props.notification} />
    <form onSubmit={props.loginHandler}>
      <label>
        Username:
        <input
          id="username"
          type="text"
          value={props.username}
          onChange={({ target }) => props.changeUsername(target.value)}
        />
      </label>
      <label>
        Password:
        <input
          id="password"
          type="password"
          value={props.password}
          onChange={({ target }) => props.changePassword(target.value)}
        />
      </label>
      <button id="login-button" type="submit">Login</button>
    </form>
  </>
);

LoginForm.propTypes = {
  username: PropTypes.string.isRequired,
  changeUsername: PropTypes.func.isRequired,
  password: PropTypes.string.isRequired,
  changePassword: PropTypes.func.isRequired,
  loginHandler: PropTypes.func.isRequired
};

export default LoginForm;
