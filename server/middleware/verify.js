const jwt = require("jsonwebtoken");

const verify = (req, res, next) => {
  try {
    //console.log(req.headers.authorization);
    const token = req.headers.authorization.split(" ")[1];
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.userData = decoded;
    console.log(decoded);
    next();
  } catch (error) {
    return res.status(401).json({
      message: "Auth failed",
    });
  }
};

module.exports = verify;
