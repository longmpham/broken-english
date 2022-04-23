const mongoose = require('mongoose')

const HistorySchema = mongoose.Schema({
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
});


const HistoryModel = mongoose.model("History", HistorySchema);
module.exports = HistorySchema