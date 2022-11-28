const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const listItemSchema = new Schema(
  {
    title: {
      type: "string",
      required: true,
    },

    description: {
      type: "string",
      required: true,
    },

    user: {
      type: "string",
      required: true,
    },

    category: {
      type: "string",
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const ListItem = mongoose.model("ListItem", listItemSchema);

module.exports = ListItem;
