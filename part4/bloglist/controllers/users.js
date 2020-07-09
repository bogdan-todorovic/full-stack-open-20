/* eslint-disable consistent-return */
const router = require("express").Router();
const bcrypt = require("bcrypt");

const User = require("../models/user");
const tokenHandler = require("../utils/token_handler");

router.get("/", async (req, res) => {
  const users = await User.find({}).populate("blogs", "title author url");
  res.status(200).json(users.map(u => u.toJSON()));
});

router.post("/", async (req, res, next) => {
  if (!req.body.password || req.body.password.length < 3) {
    return res.status(400).json({ error: "Invalid password format" });
  }
  const passwordHash = await bcrypt.hash(req.body.password, 10);
  const newUser = new User({
    username: req.body.username,
    password: passwordHash,
    name: req.body.name
  });

  try {
    const createdUser = await newUser.save();
    res.status(201).json(createdUser.toJSON());
  } catch (err) {
    next(err);
  }
});

router.post("/login", async (req, res) => {
  const user = await User.findOne({ username: req.body.username });
  const isPasswordCorrect = user === null
    ? false
    : await bcrypt.compare(req.body.password, user.password);

  if (!(user && isPasswordCorrect)) {
    return res.status(401).json({ error: "Invalid username or password." });
  }

  const userForToken = {
    username: user.username,
    id: user._id
  };
  const token = tokenHandler.generate(userForToken);
  res
    .status(200)
    .send({ token, username: user.username, name: user.name });
});

module.exports = router;
