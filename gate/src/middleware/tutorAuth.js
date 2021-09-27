const jwt = require("jsonwebtoken");
const Tutor = require("../models/tutor");

const auth = async (req, res, next) => {
  try {
    const token = req.cookies.gate;

    const decoded = jwt.verify(token, "shhhhh");
    const tutor = await Tutor.findOne({
      _id: decoded._id,
      "tokens.token": token,
    });

    if (!tutor) {
      throw new Error("Tutor not found");
    }

    req.token = token;
    req.tutor = tutor;
    next();
  } catch (e) {
    res.status(401).send({ error: "Please authenticate to become tutor" });
  }
};

module.exports = auth;
