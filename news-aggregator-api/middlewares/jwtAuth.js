const jwt = require("jsonwebtoken");
const secretKey = "API_NEWS_AGGREGATOR";
const verifyToken = (req, res, next) => {
  if (req?.headers && req?.headers?.authorization) {
    jwt.verify(req?.headers?.authorization, secretKey, (err, decode) => {
      if (err) {
        req.user = null;
        req.message = "Verification Failed. Some issue with token.";
        next();
      } else {
        req.user = decode?.id;
        req.message = "User Found";
        next();
      }
    });
  } else {
    req.user = null;
    req.message = "Authorization header not found";
    next();
  }
};
module.exports = verifyToken;
