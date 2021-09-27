const mongoose = require("mongoose");

const ratingSchema = new mongoose.Schema(
  {
    rating: {
      type: Number,
    },
    tutor: {
      type: String,
    },
    student: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

const Rating = mongoose.model("Rating", ratingSchema);

module.exports = Rating;
