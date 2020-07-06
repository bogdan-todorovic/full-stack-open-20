const totalLikes = blogs => blogs.reduce((total, blog) => total + blog.likes, 0);

const favoriteBlog = blogs => blogs.reduce(
  (favorite, blog) => (favorite.likes > blog.likes ? favorite : blog)
);

const mostBlogs = blogs => {
  const authorsBlogs = new Map();
  blogs.forEach(blog => {
    if (authorsBlogs.has(blog.author)) {
      const numOfBlogs = authorsBlogs.get(blog.author);
      authorsBlogs.set(blog.author, numOfBlogs + 1);
    } else {
      authorsBlogs.set(blog.author, 1);
    }
  });

  let [authorWithMostBlogs, numOfBlogs] = authorsBlogs.entries().next().value;
  authorsBlogs.forEach((value, key) => {
    if (value > numOfBlogs) {
      authorWithMostBlogs = key;
      numOfBlogs = value;
    }
  });
  return {
    author: authorWithMostBlogs,
    blogs: numOfBlogs
  };
};

const mostLikes = blogs => {
  const authorsLikes = new Map();
  const mostLiked = {
    author: "",
    likes: 0
  };
  blogs.forEach(blog => {
    if (authorsLikes.has(blog.author)) {
      const currentLikes = authorsLikes.get(blog.author);
      authorsLikes.set(blog.author, currentLikes + blog.likes);
    } else {
      authorsLikes.set(blog.author, blog.likes);
    }

    if (authorsLikes.get(blog.author) > mostLiked.likes) {
      mostLiked.author = blog.author;
      mostLiked.likes = authorsLikes.get(blog.author);
    }
  });
  return mostLiked;
};

module.exports = {
  totalLikes,
  favoriteBlog,
  mostBlogs,
  mostLikes
};
