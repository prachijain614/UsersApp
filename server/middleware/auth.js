const jwt = require("jsonwebtoken");

const config = process.env;

const verifyToken = (req, res, next) => {
  const token =
    req.body.token ||
    req.query.token ||
    req.headers["x-access-token"] ||
    req.headers["authorization"];

  if (!token) {
    /** If token is not present in the request */
    return res.status(403).send("A token is required for authentication");
  }
  try {
    /** IF token is verifed */
    const decoded = jwt.verify(token, process.env.TOKEN_KEY);
    req.user = decoded;
  } catch (err) {
    /** IF token is invalid */
    return res.status(401).send("Invalid Token");
  }
  return next();
};

module.exports = verifyToken;
