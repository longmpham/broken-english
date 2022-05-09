const mongoose = require("mongoose");
var findOrCreate = require('mongoose-findorcreate')


const UserSchema = mongoose.Schema({
  username: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
},
{
  timestamps: true,
});


UserSchema.plugin(findOrCreate) // add findorcreate from the package mongoose-findorcreate
const UserModel = mongoose.model("User", UserSchema)
module.exports = UserModel