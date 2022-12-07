const { getUserDataByAccessToken } = require("../helpers");
const User = require("../models/User");
const Event = require("../models/Event");

const getAllEvents = async (req, res) => {
  //recieve token from request and use it to get user's own events from db
  res.send("all events");
};

const addEvents = async (req, res) => {
  // console.log(req.headers.access_token);
  try {
    const getuser = getUserDataByAccessToken(req.headers.access_token);
    const userinfo = await getuser;
    // console.log(userinfo);

    if (userinfo.email) {
      const user = await User.findOne({ email: userinfo.email });
      const dbevents = await Event.findOne({
        user_id: user._id,
        title: "To do",
      });

      var events = req.body;

      // console.log(dbevents);
      const last_updated_date = new Date(dbevents.updatedAt).getTime();
      console.log(last_updated_date);

      var addEvents = [];

      events.map((event) => {
        const event_creation_date = new Date(event.created).getTime();
        if (event_creation_date > last_updated_date) {
          console.log(event_creation_date);

          addEvents.push({
            summary: event.summary,
            description: event.description,
            google_event_id: event.id,
          });
        }
      });

      if (addEvents.length > 0) {
        console.log(addEvents);
        dbevents.update({ $addToSet: { events: { $each: addEvents } } }).exec();
        console.log("Updated events");
      }
    }
  } catch (error) {
    console.log(error);
  }
  // console.log(JSON.stringify(req.headers.connection));
};

//get all User events using access toke
const getAllUserEvents = async (req, res) => {
  try {
    const getUser = getUserDataByAccessToken(req.headers.access_token);
    const userinfo = await getUser;

    console.log(userinfo);

    const user = await User.findOne({ email: userinfo.email });

    // console.log(userinfo);
    const events = await Event.find({ user_id: user._id }).exec();
    // console.log(events);
    res.status(200).send(events);
  } catch (err) {
    res.send(err);
    console.log(err);
  }
};

const changeEventColumn = async (req, res) => {
  console.log("An Event request hit");
  console.log(req.body);
  // console.log(req.headers);
  res.send("change event column");

  const { destination, draggableId, source } = req.body;

  const draggedevent = await Event.find(
    {
      events: {
        $elemMatch: {
          _id: draggableId,
        },
      },
    },
    { "events.$": 1 }
  ).exec();

  console.log(draggedevent[0].events);
  const dragged_event = draggedevent[0].events;

  if (source.droppableId !== destination.droppableId) {
    await Event.findByIdAndUpdate(
      { _id: destination.droppableId },
      {
        $push: {
          events: {
            $each: dragged_event,
            $position: destination.index,
          },
        },
      }
    ).exec();

    await Event.findByIdAndUpdate(
      { _id: source.droppableId },
      { $pull: { events: { _id: draggableId } } }
      // { multi: true }
    ).exec();
  } else if (source.droppableId == destination.droppableId) {
    await Event.findByIdAndUpdate(
      { _id: source.droppableId },
      { $pull: { events: { _id: draggableId } } }
      // { multi: true }
    ).exec();

    await Event.findByIdAndUpdate(
      { _id: destination.droppableId },
      {
        $push: {
          events: {
            $each: dragged_event,
            $position: destination.index,
          },
        },
      }
    ).exec();
  }
};

module.exports = {
  getAllEvents,
  addEvents,
  getAllUserEvents,
  changeEventColumn,
};
