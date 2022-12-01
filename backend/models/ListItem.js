const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const listItemSchema = new Schema(
  {
    user: {
      type: "string",
      required: true,
    },

    title: {
      type: "string", // Todo
      required: true,
    },

    items: [
      {
        title: "string",
        content: "string",
      },
    ],
  },
  {
    timestamps: true,
  }
);

const ListItem = mongoose.model("ListItem", listItemSchema);

module.exports = ListItem;
