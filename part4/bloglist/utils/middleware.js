const errorHandler = (err, req, res, next) => {
  if (err.name === "ValidationError") {
    res.status(400).send({ error: err.message });
  }
  next(err);
};

// eslint-disable-next-line consistent-return
const tokenExtractor = (req, res, next) => {
  const authorization = req.get("Authorization");
  if (!(authorization && authorization.startsWith("Bearer "))) {
    return res.status(401).json({ error: "Authorization token is missing." });
  }
  req.token = authorization.substring(7);
  next();
};

module.exports = {
  errorHandler,
  tokenExtractor
};
