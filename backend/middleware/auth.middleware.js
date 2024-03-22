const jwt = require("jsonwebtoken");
const asyncHandler = require("express-async-handler");
const Student = require("../models/student.model");

const protect = asyncHandler(async (req, res, next) => {
  let token;

  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    try {
      // Get token from header
      token = req.headers.authorization.split(" ")[1];

      //Verify token
      req.user = jwt.verify(token, process.env.JWT_SECRET); 

      // Get student from the token
      // req.student = await Student.findById(decoded.id).select('-password')

      next();
    } catch (error) {
      console.log(error);
      res.status(401);
      throw new Error("Not authorized");
    }
  }

  if (!token) {
    res.status(401);
    throw new Error("Not authorized, no token");
  }
});

module.exports = { protect };
