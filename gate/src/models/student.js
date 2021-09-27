const mongoose = require("mongoose");
const validator = require("validator");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const studentSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
      lowercase: true,
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
      // required: true,
      minlength: 6,
      trim: true,
      validate(value) {
        if (value.toLowerCase().includes("password")) {
          throw new Error('Password cannot contain "PASSWORD"');
        }
      },
    },
    phone: {
      type: Number,
      trim: true,
      // required: true,
    },
    address: {
      type: String,
      trim: true,
      lowercase: true,
    },
    hired_or_not: {
      type: Boolean,
      required: true,
    },
    school: {
      type: String,
      trim: true,

      lowercase: true,
    },
    gender: {
      type: String,
    },
    level: {
      type: String,
      trim: true,
      lowercase: true,
    },
    avatar: {
      type: Buffer,
    },
    idType: {
      type: String,
      trim: true,
      lowercase: true,
      enum: ["email", "google"],
      default: "email",
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
studentSchema.methods.toJSON = function () {
  const student = this;
  const studentObject = student.toObject();

  delete studentObject.password;
  delete studentObject.tokens;

  return studentObject;
};

//for generation auth token
studentSchema.methods.generateAuthToken = async function () {
  const Student = this;
  const token = jwt.sign({ _id: Student._id.toString() }, "shhhhh");

  Student.tokens = Student.tokens.concat({ token });
  await Student.save();

  return token;
};

//for finding credentials of students
studentSchema.statics.findByCredentials = async (email, password) => {
  const student = await Student.findOne({ email });

  if (!student) {
    throw new Error("Unable to login");
  }

  const isMatch = await bcrypt.compare(password, student.password);

  if (!isMatch) {
    throw new Error("Unable to login");
  }

  return student;
};

//Hash the pllain text password
studentSchema.pre("save", async function (next) {
  const student = this;

  if (student.isModified("password")) {
    student.password = await bcrypt.hash(student.password, 8);
  }

  next();
});

const Student = mongoose.model("Student", studentSchema);

module.exports = Student;
