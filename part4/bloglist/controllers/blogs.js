const router = require("express").Router();

const Blog = require("../models/blog");

router.get("/", (req, res) => {
  Blog
    .find({})
    .then(blogs => res.json(blogs.map(blog => blog.toJSON())));
});

router.post("/", (req, res, next) => {
  const blog = new Blog({
    title: req.body.title,
    author: req.body.author,
    url: req.body.url,
    likes: 0
  });

  blog
    .save()
    .then(savedBlog => res.status(201).json(savedBlog.toJSON()))
    .catch(err => next(err));
});

module.exports = router;
