//dawer dyl middleware ymn3 ay wa7ed madayrch login ydkhal l api
const jwt = require("jsonwebtoken");
const User = require("../models/User");

const protect = async (req, res, next) => {
  try {
    let token;
    //check header
    if(
      req.headers.authorization && req.headers.authorization.startsWith("Bearer")
    ) {
      //extract token
      token = req.headers.authorization.split(" ")[1]; //kan7aydo bearer nkhaliw token

      //verify token
      const decoded = jwt.verify(token, process.env.JWT_SECRET); // verify token 

      //get user from db
      req.user = await User.findById(decoded.id).select("-password");

      next();
    }else {
      return res.status(401).json({ message: "Not authorized, no token" });
    }
  } catch (error) {
    return res.status(401).json({ message: "Not authorized, token failed" });
  }
}

module.exports = protect;