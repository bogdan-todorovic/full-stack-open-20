import React, { useState } from "react";

const Blog = ({ blog, handleLike }) => {
  const [showDetails, setShowDetails] = useState(false);
  const toggleDetails = () => setShowDetails(!showDetails);

  const addLike = () => {
    blog.likes = blog.likes + 1;
    handleLike(blog);
  };

  return (
    <div>
      <p>Title: {blog.title}</p>
      <span><button onClick={toggleDetails}>{showDetails ? "hide" : "expand"}</button></span>
      {
        showDetails
          ? <div>
            <p>Author: {blog.author}</p>
            <p>
              Likes: {blog.likes}
              <button onClick={() => addLike()}>like</button>
            </p>
          </div>
          : <div></div>
      }
      <hr />
    </div>
  );
};

export default Blog;
