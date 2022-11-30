const axios = require("axios");

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

    // console.log(userinfo);
    //   .then(function (response) {
    //     console.log("infooooooooooooo");
    //     console.log(response.data);
    //     userinfo = response.data;
    //     // findOrCreate(response.data.email);
    //   })
    //   .catch(function (error) {
    //     return error;
    //   });

    // return userinfo;
  },
};

module.exports = helpers;
