const jwt = require("jsonwebtoken")

// const config = process.env;

const verifyToken = (req, res, next) => {
  const token =
    req.body.token || req.query.token || req.headers["x-access-token"];

  if (!token)
    return res
        .status(403)
        .json({ message: "Unauthorised access" })
  
  try {
    const decoded = jwt.verify(token, '123456789');
    req.emailId = decoded;
  } 
  catch (err) {
    return res
        .status(401)
        .send("Unauthorised access");
  }
  return next();
};

module.exports =  verifyToken;