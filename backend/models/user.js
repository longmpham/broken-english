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
      sparse: true, // enables multiple "NULL" cases!
    },
    password: {
      type: String,
      // required: true,
    },
    photo: {
      type: String,
      required: false,
    },
    user: {
      firstName: {
        type: String,
      },
      lastName: {
        type: String,
      },
      height: {
        type: String,
      },
      weight: {
        type: String,
      },
      gender: {
        type: String,
      },
    },
    conversations: [
      {
        roomId: {
          type: String,
        },
        receiver: {
          type: String,
        },
        messsages: [
          {
            author: {
              type: String,
            },
            message: {
              type: String,
            },
            date: {
              type: Date,
            }
          },
        ],
      },
      {
        timestamps: true,
      },
    ],
  },
  {
    timestamps: true,
  }
);
const UserModel = mongoose.model("User", UserSchema);
module.exports = UserModel;
