const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const EventSchema = new Schema(
  {
    user_id: {
      type: "string",
      required: true,
    },

    title: {
      type: "string", // Todo
      required: true,
    },

    events: [
      {
        summary: "string",
        description: "string",
        google_event_id: "string",
      },
    ],
  },
  {
    timestamps: true,
  }
);

const Event = mongoose.model("Event", EventSchema);

module.exports = Event;
