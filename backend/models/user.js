const mongoose = require("mongoose");

const UserSchema = mongoose.Schema(
  {
    googleId: {
      type: String,
      required: false,
    },
    twitterId: {
      type: String,
      required: false,
    },
    githubId: {
      type: String,
      required: false,
    },
    facebookId: {
      type: String,
      required: false,
    },
    username: {
      type: String,
      // required: true,
    },
    email: {
      type: String,
      // required: true,
      unique: true,
    },
    password: {
      type: String,
      // required: true,
    },
    photo: {
      type: String,
      required: false,
    }
  },
  {
    timestamps: true,
  }
);
const UserModel = mongoose.model("User", UserSchema);
module.exports = UserModel;
