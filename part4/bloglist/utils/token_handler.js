const jwt = require("jsonwebtoken");

const verify = (token, res) => {
  const decodedToken = jwt.verify(token, process.env.SECRET);
  if (decodedToken.id) {
    return decodedToken;
  }
  return res.status(401).json({ error: "Invalid token." });
};

const generate = user => jwt.sign(user, process.env.SECRET);

module.exports = {
  verify,
  generate
};
