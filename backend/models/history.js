const mongoose = require("mongoose");

const ConversationSchema = mongoose.Schema(
  {
    room: {
      type: String,
    },
    author: {
      type: String,
    },
    message: {
      type: String,
    },
    time: {
      type: String,
    },
  },
  { timestamps: true }
);

const HistoryModel = mongoose.model("History", ConversationSchema);
module.exports = ConversationSchema;
