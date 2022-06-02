const mongoose = require("mongoose");

const MessageSchema = mongoose.Schema(
  {
    sender: {
      type: String,
    },
    message: {
      type: String,
    },
    translatedMessage: {
      type: String,
    },
  },
  { timestamps: true }
);

const MessageModel = mongoose.model("Message", MessageSchema);
module.exports = MessageModel;
