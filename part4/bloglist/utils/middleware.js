const errorHandler = (err, req, res, next) => {
  if (err.name === "ValidationError") {
    res.status(400).send({ error: "Validation error" });
  }
  next(err);
};

module.exports = {
  errorHandler
};
