import React, { useRef } from "react";

import Blog from "./Blog";
import BlogCreateForm from "./BlogCreateForm";
import Toggleable from "./Toggleable";

const BlogsPage = props => {
  const blogCreateFormRef = useRef();

  return (
    <div>
      <h2>User {props.user} is logged in</h2>
      <button onClick={props.logout}> logout</button>
      <h2>Create form</h2>
      <Toggleable ref={blogCreateFormRef}>
        <BlogCreateForm
          title={props.title}
          changeTitle={props.changeTitle}
          author={props.author}
          changeAuthor={props.changeAuthor}
          url={props.url}
          changeUrl={props.changeUrl}
          create={props.create}
          notification={props.notification}
        />
      </Toggleable>
      <h2>Blogs</h2>
      {props.blogs.map(blog => <Blog key={blog.id} blog={blog} handleLike={props.handleLike} />)}
    </div>
  );
};

export default BlogsPage;
