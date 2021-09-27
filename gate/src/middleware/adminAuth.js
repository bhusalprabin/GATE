const jwt = require("jsonwebtoken");
const Admin = require("../models/admin");

const auth = async (req, res, next) => {
  try {
    const token = req.cookies.gate;
    const decoded = jwt.verify(token, "shhhhh");
    const admin = await Admin.findOne({
      _id: decoded._id,
      "tokens.token": token,
    });

    if (!admin) {
      throw new Error("Admin not found");
    }
    req.token = token;
    req.admin = admin;
    next();
  } catch (e) {
    res.status(401).send({ error: "Please authenticate to become admin" });
  }
};

module.exports = auth;
