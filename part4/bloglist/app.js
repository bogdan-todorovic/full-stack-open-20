const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const morgan = require("morgan");

const config = require("./utils/config");
const logger = require("./utils/logger");
const blogRouter = require("./controllers/blogs");

mongoose
  .connect(config.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => logger.info("Successfully connected to mongodb"))
  .catch(error => logger.info("Unable to connect to mongodb", error.message));

const app = express();
app.use(express.json());
app.use(cors());
app.use(morgan("tiny"));
app.use("/api/blogs", blogRouter);

module.exports = app;
