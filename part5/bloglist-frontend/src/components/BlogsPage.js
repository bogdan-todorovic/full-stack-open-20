import React from "react";

import Blog from "./Blog";
import BlogCreateForm from "./BlogCreateForm";

const BlogsPage = props => {
  return (
    <div>
      <h2>User {props.user} is logged in</h2>
      <button onClick={props.logout}> logout</button>
      <h2>Create form</h2>
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
      <h2>Blogs</h2>
      {props.blogs.map(blog => <Blog key={blog.id} blog={blog} />)}
    </div>
  );
};

export default BlogsPage;
