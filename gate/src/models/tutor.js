const mongoose = require("mongoose");
const validator = require("validator");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const Courses = require("./course");

const tutorSchema = new mongoose.Schema(
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
      validate(email) {
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
    phone: {
      type: Number,
      required: true,
      trim: true,
    },
    price: {
      type: Number,
      required: true,
      trim: true,
      default: 200,
    },
    address: {
      type: String,
      required: true,
      trim: true,
      lowercase: true,
    },
    gender: {
      type: String,
      required: true,
      enum: ["male", "female"],
    },
    level: [
      {
        type: String,
        required: true,
        trim: true,
        lowercase: true,
      },
    ],
    subjects: [
      {
        type: String,
        required: true,
        lowercase: true,
      },
    ],
    avatar: {
      type: Buffer,
    },
    certificate: {
      type: Buffer,
    },
    verify: {
      type: String,
      trim: true,
      default: "false",
      enum: ["true", "false", "pending", "rejected"],
    },
    rating: {
      type: Number,
      default: 2.5,
    },
    status: {
      type: String,
      trim: true,
      default: "free",
      enum: ["free", "busy"],
    },
    tagline: {
      type: String,
      trim: true,
    },
    verifyEmail: {
      type: String,
      trim: true,
      default: "no",
      enum: ["yes", "no"],
    },
    bio: {
      type: String,
      trim: true,
    },
    tokens: [
      {
        token: {
          type: String,
          required: true,
          ref: "Tutor",
        },
      },
    ],
  },
  {
    timestamps: true,
  }
);
//relationships between two entities
tutorSchema.virtual("courses", {
  ref: "Course",
  localField: "_id",
  foreignField: "owner",
});

//removing password and tokens
tutorSchema.methods.toJSON = function () {
  const tutor = this;
  const tutorObject = tutor.toObject();

  delete tutorObject.password;
  delete tutorObject.tokens;
  // delete tutorObject.avatar;

  return tutorObject;
};

//for generation auth token
tutorSchema.methods.generateAuthToken2 = async function () {
  const Tutor = this;
  const token = jwt.sign({ _id: Tutor._id.toString() }, "shhhhh");

  Tutor.tokens = Tutor.tokens.concat({ token });
  await Tutor.save();

  return token;
};

//for finding credentials of students
tutorSchema.statics.findByCredentials = async (email, password) => {
  const tutor = await Tutor.findOne({ email });

  if (!tutor) {
    throw new Error("Unable to login");
  }

  const isMatch = await bcrypt.compare(password, tutor.password);

  if (!isMatch) {
    throw new Error("Unable to login");
  }

  return tutor;
};

tutorSchema.pre("save", async function (next) {
  const tutor = this;

  if (tutor.isModified("password")) {
    tutor.password = await bcrypt.hash(tutor.password, 8);
  }

  next();
});

//Delete user Courses when tutor is removed
tutorSchema.pre("remove", async function (next) {
  const tutor = this;
  await Courses.deleteMany({ owner: tutor._id });

  next();
});

const Tutor = mongoose.model("Tutor", tutorSchema);

module.exports = Tutor;
