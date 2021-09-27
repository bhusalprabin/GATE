const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const messageSchema = new Schema(
  {
    username: {
      type: String,
      required: true,
    },

    message: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: {
      createdAt: true,
      updatedAt: false,
    },
  }
);

const Message = mongoose.model("AdminStudentMessage", messageSchema);

module.exports = Message;
