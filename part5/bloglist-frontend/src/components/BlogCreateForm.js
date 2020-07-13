import React from "react";

import Notification from "./Notification";

const BlogCreateForm = props => (
  <>
    <Notification message={props.notification} />
    <form onSubmit={props.create}>
      <label>
        Title:
        <input
          type="text"
          value={props.title}
          onChange={({ target }) => props.changeTitle(target.value)}
        />
      </label>
      <label>
        Author:
        <input
          type="text"
          value={props.author}
          onChange={({ target }) => props.changeAuthor(target.value)}
        />
      </label>
      <label>
        Url:
        <input
          type="text"
          value={props.url}
          onChange={({ target }) => props.changeUrl(target.value)}
        />
      </label>
      <button type="submit">Create</button>
    </form>
  </>
);

export default BlogCreateForm;