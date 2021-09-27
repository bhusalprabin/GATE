const mongoose = require("mongoose");
const validator = require("validator");

const subjectSchema = new mongoose.Schema(
  {
    course_name: {
      type: String,
      require: true,
      trim: true,
    },
    course_id: {
      type: String,
      require: true,
      trim: true,
      lowercase: true,
      unique: true,
    },
    level: {
      type: String,
      require: true,
      trim: true,
      lowercase: true,
    },
    tutor: {
      type: String,
      required: true,
    },
    approved: {
      type: String,
      default: "false",
      enum: ["false", "true", "pending", "rejected"],
    },
  },
  {
    timestamps: true,
  }
);

const Subject = mongoose.model("AddSubject", subjectSchema);

module.exports = Subject;
