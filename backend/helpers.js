const axios = require("axios");
const User = require("./models/User");

const helpers = {
  getUserDataByAccessToken: async (token) => {
    let userinfo;
    try {
      const response = await axios.get(process.env.USER_PROFILE_URL + token, {
        headers: {
          "Content-Type": "application/json",
          "Accept-Encoding": "application/json",
        },
      });
      userinfo = response.data;
    } catch (err) {
      console.log(err);
    }

    return userinfo;
  },

  findOrCreate: async (userinfo, refresh_token) => {
    var client;

    try {
      const user = await User.findOne({
        email: userinfo.email,
      });
      if (user === null) {
        const user = new User({
          name: userinfo.name,
          email: userinfo.email,
          refresh_token: refresh_token,
        });
        await user.save();
        console.log(user);
        client = user;
      } else {
        client = user;
        // console.log(user);
      }
    } catch (err) {
      console.log(err);
    }
    // console.log(client);
    return client;
  },
};

module.exports = helpers;
