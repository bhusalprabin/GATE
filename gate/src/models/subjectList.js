const mongoose = require("mongoose");
const validator = require("validator");

const subjectListSchema = new mongoose.Schema(
  {
    subjectName: {
      type: String,
      require: true,
      trim: true,
    },
    value: {
      type: String,
      require: true,
      trim: true,
      lowercase: true,
      unique: true,
    },
  },
  {
    timestamps: true,
  }
);

const Subject = mongoose.model("SubjectList", subjectListSchema);

module.exports = Subject;
