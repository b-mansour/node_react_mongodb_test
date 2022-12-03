const { getUserDataByAccessToken, findOrCreate } = require("../helpers");
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
      // console.log(user);
      // console.log(req.body);
      var addEvents = [];
      req.body.map((event) => {
        addEvents.push({
          summary: event.summary,
          description: event.description,
        });
        console.log(event.description);
      });

      var events = new Event({
        user_id: user._id,
        title: "To do",
        events: addEvents,
      });
      // await events.save();

      //add the events in req.body to database and set the user as user.id
    }
  } catch (error) {
    console.log(error);
  }
  // console.log(JSON.stringify(req.headers.connection));
  // res.json({ "Add Events": "eventsssssss" });
};

//get all User events using access toke
const getAllUserEvents = async (req, res) => {
  res.send("All user events ");
};

module.exports = { getAllEvents, addEvents, getAllUserEvents };
