import React from "react";

import Notification from "./Notification";

const LoginForm = props => (
  <>
    <Notification message={props.notification} />
    <form onSubmit={props.loginHandler}>
      <label>
        Username:
        <input
          type="text"
          value={props.username}
          onChange={({ target }) => props.changeUsername(target.value)}
        />
      </label>
      <label>
        Password:
        <input
          type="password"
          value={props.password}
          onChange={({ target }) => props.changePassword(target.value)}
        />
      </label>
      <button type="submit">Login</button>
    </form>
  </>
);

export default LoginForm;
