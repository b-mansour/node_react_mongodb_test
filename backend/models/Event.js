const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const EventSchema = new Schema(
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

const Event = mongoose.model("Event", EventSchema);

module.exports = Event;
