const mongoose = require("mongoose");
const validator = require("validator");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const adminSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
      lowercase: true,
      default: "admin",
    },
    email: {
      type: String,
      unique: true,
      required: true,
      trim: true,
      lowercase: true,
      // async
      validate(email) {
        // const student = await this.constructor.findOne({ email });
        // if (student) {
        //   throw new Error("Email is already in use");
        // }
        if (!validator.isEmail(email)) {
          throw new Error("Email is invalid");
        }
      },
    },
    password: {
      type: String,
      required: true,
      minlength: 6,
      trim: true,
      validate(value) {
        if (value.toLowerCase().includes("password")) {
          throw new Error('Password cannot contain "PASSWORD"');
        }
      },
    },
    //for allowing users to access their account from different devices at a time!!
    tokens: [
      {
        token: {
          type: String,
          required: true,
        },
      },
    ],
  },
  {
    timestamps: true,
  }
);

//removing password and tokens
adminSchema.methods.toJSON = function () {
  const student = this;
  const studentObject = student.toObject();

  delete studentObject.password;
  delete studentObject.tokens;

  return studentObject;
};

//for generation auth token
adminSchema.methods.generateAuthToken = async function () {
  const Admin = this;
  const token = jwt.sign({ _id: Admin._id.toString() }, "shhhhh");

  Admin.tokens = Admin.tokens.concat({ token });
  await Admin.save();

  return token;
};

//for finding credentials of admin
adminSchema.statics.findByCredentials = async (name, password) => {
  const admin = await Admin.findOne({ name });

  if (!admin) {
    throw new Error("Unable to login");
  }

  const isMatch = await bcrypt.compare(password, admin.password);

  if (!isMatch) {
    throw new Error("Unable to login");
  }

  return admin;
};

//Hash the pllain text password
adminSchema.pre("save", async function (next) {
  const admin = this;

  if (admin.isModified("password")) {
    admin.password = await bcrypt.hash(admin.password, 8);
  }

  next();
});

const Admin = mongoose.model("Admin", adminSchema);

module.exports = Admin;
