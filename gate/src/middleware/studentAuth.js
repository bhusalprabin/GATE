const jwt = require("jsonwebtoken");
const Student = require("../models/student");

const auth = async (req, res, next) => {
  try {
    const token = req.cookies.gate;

    const decoded = jwt.verify(token, "shhhhh");
    const student = await Student.findOne({
      _id: decoded._id,
      "tokens.token": token,
    });

    if (!student) {
      throw new Error("User not found");
    }

    req.token = token;
    req.student = student;

    next();
  } catch (e) {
    console.log(e);
    res.status(401).send({ error: "Please authenticate." });
  }
};

module.exports = auth;
