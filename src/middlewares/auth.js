const jwt = require("jsonwebtoken");

const validateToken = function (req, res, next) {
  try {
    let token = req.headers["x-Auth-token"];
    if (!token) token = req.headers["x-auth-token"];

    if (!token) return res.status(404).send({ status: false, msg: "token must be present" });

    console.log(token);

    let decodedToken = jwt.verify(token, "functionup-plutonium-very-very-secret-key");
    if (!decodedToken) {
      return res.status(400).send({ status: false, msg: "token is invalid" });
    }
    req.loggedInUser = decodedToken.userId
    next()
  }
  catch (err) {
    console.log("this is the error:", err.message)
    res.status(500).send({ msg: "error", error: err.message })
  }
}


const checkIfAuthorized = function (req, res, next) {
  try {
    let requestUserId = req.params.userId
    if (requestUserId !== req.loggedInUser) {
      return res.status(403).send({ status: false, msg: "permission denied" })
    }
    next()
  }
  catch (err) {
    console.log("this is the error:", err.message)
    res.status(500).send({ msg: "error", error: err.message })
  }
}

module.exports.validateToken = validateToken
module.exports.checkIfAuthorized = checkIfAuthorized