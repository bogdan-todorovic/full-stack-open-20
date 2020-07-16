import React, { useState, useEffect } from "react";

import BlogsPage from "./components/BlogsPage";
import LoginForm from "./components/LoginForm";
import blogService from "./services/blogs";
import loginService from "./services/login";

const App = () => {
  const [blogs, setBlogs] = useState([]);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [user, setUser] = useState(null);
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [url, setUrl] = useState("");
  const [notification, setNotification] = useState("");

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem("user");
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON);
      setUser(user);
      blogService.setToken(user.token);
    }
  }, []);

  useEffect(() => {
    blogService
      .getAll()
      .then(returnedBlogs => {
        const sortedBlogs = returnedBlogs.sort(blogService.compareBlogs);
        setBlogs(sortedBlogs);
      });
  }, [user]);

  const onUsernameChange = newUsername => setUsername(newUsername);
  const onPasswordChange = newPassword => setPassword(newPassword);
  const onTitleChange = newTitle => setTitle(newTitle);
  const onAuthorChange = newAuthor => setAuthor(newAuthor);
  const onUrlChange = newUrl => setUrl(newUrl);

  const handleLogin = event => {
    event.preventDefault();
    loginService
      .login({ username: username, password: password })
      .then(response => {
        setUser(response);
        blogService.setToken(response.token);
        window.localStorage.setItem("user", JSON.stringify(response));
      })
      .catch(() => {
        setNotification("Invalid username or password");
        setTimeout(() => {
          setNotification("");
        }, 5000);
      });
  };

  const handleLogout = event => {
    event.preventDefault();
    setUser(null);
    window.localStorage.removeItem("user");
  };

  const createNewBlog = event => {
    event.preventDefault();
    const newBlog = {
      title: title,
      author: author,
      url: url
    };
    blogService
      .create(newBlog)
      .then(response => {
        setBlogs(blogs.concat(response));
        setTitle("");
        setUrl("");
        setNotification("New blog successfully created");
        setTimeout(() => {
          setNotification("");
        }, 5000);
      });
  };

  const likeBlog = blog => {
    const updatedBlog = {
      likes: blog.likes + 1
    };

    blogService
      .update(blog.id, updatedBlog)
      .then(response => setBlogs(blogs.concat(response)));
  };

  return (
    <div>
      {
        user === null
          ? <LoginForm
            username={username}
            changeUsername={onUsernameChange}
            password={password}
            changePassword={onPasswordChange}
            loginHandler={handleLogin}
            notification={notification}
          />
          : <BlogsPage
            blogs={blogs}
            user={user.name}
            logout={handleLogout}
            title={title}
            changeTitle={onTitleChange}
            author={author}
            changeAuthor={onAuthorChange}
            url={url}
            changeUrl={onUrlChange}
            create={createNewBlog}
            handleLike={likeBlog}
            notification={notification}
          />
      }
    </div>
  );
};

export default App;
