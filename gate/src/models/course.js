const mongoose = require("mongoose");
const validator = require("validator");

const courseSchema = new mongoose.Schema(
  {
    course_name: {
      type: String,
      require: true,
      trim: true,
      lowercase: true,
    },
    level: {
      type: String,
      require: true,
      trim: true,
      lowercase: true,
    },
    student: {
      type: String,
      required: true,
    },
    tutor: {
      type: String,
      required: true,
    },
    approveByTutor: {
      type: String,
      enum: ["true", "false", "rejected"],
      default: "false",
    },
    subjectName: {
      type: String,
      lowercase: true,
    },
    level: {
      type: String,
      lowercase: true,
      trim: true,
    },
    startDate: {
      type: Date,
      trim: true,
    },
    endDate: {
      type: Date,
      trim: true,
    },
    collegeName: {
      type: String,
    },
    address: {
      type: String,
    },
    avatar: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

const Course = mongoose.model("Course", courseSchema);

module.exports = Course;
