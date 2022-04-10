const mongoose = require("mongoose")

const MessageSchema = mongoose.Schema({
  message: {
    type: String,
  },
  translatedMessage: {
    type: String,
  }
},
{
  timestamps: true,
});

const MessageModel = mongoose.model("Message", MessageSchema);
module.exports = MessageModel