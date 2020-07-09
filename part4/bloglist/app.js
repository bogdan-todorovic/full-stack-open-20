const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const morgan = require("morgan");

const config = require("./utils/config");
const logger = require("./utils/logger");
const middleware = require("./utils/middleware");
const blogRouter = require("./controllers/blogs");
const userRouter = require("./controllers/users");

mongoose
  .connect(config.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => logger.info("Successfully connected to mongodb"))
  .catch(error => logger.info("Unable to connect to mongodb", error.message));

const app = express();
app.use(express.json());
app.use(cors());
app.use(morgan("tiny"));
app.use("/api/users", userRouter);
app.use(middleware.tokenExtractor);
app.use("/api/blogs", blogRouter);
app.use(middleware.errorHandler);

module.exports = app;
