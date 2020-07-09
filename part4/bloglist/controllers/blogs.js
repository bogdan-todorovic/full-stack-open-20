const router = require("express").Router();

const tokenHandler = require("../utils/token_handler");
const Blog = require("../models/blog");
const User = require("../models/user");

router.get("/", async (req, res) => {
  const blogs = await Blog.find({}).populate("user", "username name");
  res.json(blogs.map(blog => blog.toJSON()));
});

router.post("/", async (req, res, next) => {
  const decodedToken = tokenHandler.verify(req.token, res);
  const user = await User.findById(decodedToken.id);

  const blog = new Blog({
    title: req.body.title,
    author: req.body.author,
    url: req.body.url,
    likes: req.body.likes || 0,
    user: user._id
  });

  try {
    const savedBlog = await blog.save();
    user.blogs = user.blogs.concat(savedBlog._id);
    await user.save();
    res.status(201).json(savedBlog.toJSON());
  } catch (err) {
    next(err);
  }
});

router.put("/:id", async (req, res, next) => {
  const blog = {
    likes: req.body.likes
  };

  try {
    const updatedBlog = await Blog.findByIdAndUpdate(req.params.id, blog, { new: true });
    res.json(updatedBlog.toJSON());
  } catch (err) {
    next(err);
  }
});

// eslint-disable-next-line consistent-return
router.delete("/:id", async (req, res, next) => {
  const decodedToken = tokenHandler.verify(req.token, res);
  const user = await User.findById(decodedToken.id);

  try {
    const blog = await Blog.findById(req.params.id);

    if (blog.user.toString() !== decodedToken.id) {
      return res.status(400).json({ error: "You have no permissions to delete this blog." });
    }

    await Blog.deleteOne({ _id: blog.id });
    const index = user.blogs.indexOf(blog.id.toString());
    user.blogs.splice(index, 1);
    await user.save();
    return res.status(204).end();
  } catch (err) {
    next(err);
  }
});

module.exports = router;
