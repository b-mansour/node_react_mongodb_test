const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userSchema = new Schema(
  {
    name: {
      type: "string",
      required: true,
    },

    email: {
      type: "string",
      required: true,
    },

    refresh_token: {
      type: "string",
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const User = mongoose.model("User", userSchema);

module.exports = User;
