const jwt = require("jsonwebtoken");
const Student = require("../models/student");
const Tutor = require("../models/tutor");

const auth = async (req, res, next) => {
  try {
    const token = req.cookies.gate;

    const decoded = jwt.verify(token, "shhhhh");
    const user = awuser.findOne({
      _id: decoded._id,
      "tokens.token": token,
    });

    req.user = 2;

    next();
  } catch (e) {
    try {
      //   const token = req.cookies.gate;

      //   const decoded = jwt.verify(token, "shhhhh");
      const user = await Student.findOne({
        _id: decoded._id,
        "tokens.token": token,
      });

      //   if (!user) {
      //     user = await Student.findOne({
      //       _id: decoded._id,
      //       "tokens.token": token,
      //     });

      //     if (!user) {
      //       return (req.user = 0);
      //     }

      //     return (req.student = 1);
      //   }

      req.user = 1;

      next();
    } catch (e) {
      next();
    }
  }
};

module.exports = auth;
