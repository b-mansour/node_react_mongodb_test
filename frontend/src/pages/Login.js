import React, { useState } from "react";
import { GoogleLogin } from "react-google-login";
import { gapi } from "gapi-script";
import { useEffect } from "react";
import axios from "axios";

export default function Login() {
  const clientId = process.env.REACT_APP_GOOGLE_CLIENT_ID;

  useEffect(() => {
    function start() {
      gapi.auth2.init({
        clientId: clientId,
      });
    }

    gapi.load("client:auth2", start);
    // console.log(gapi.client());
  });

  // const access_token = gapi.auth.getToken().access_token;

  function responseGoogleSuccess(response) {
    getEvents();
    // console.log(response);
    const { code } = response;
    // console.log(code);
    axios
      .post("http://localhost:4000/users/create-token", { code })
      .then((response) => {
        console.log(response.data);
      })
      .catch((error) => {
        console.log(error.message);
      });
  }

  async function getEvents() {
    console.log(gapi.client.getToken());
    const request = {
      calendarId: "primary",
      timeMin: new Date().toISOString(),
      showDeleted: false,
      singleEvents: true,
      maxResults: 10,
      orderBy: "startTime",
    };

    gapi.client.init({ clientId: clientId }).then(() => {
      gapi.client.load("calendar", "v3", () => {
        gapi.client.calendar.events.list(request).then(function (response) {
          console.log(response.result.items);
          let events = response.result.items;
          // todo: add events to db
        });
      });
    });
  }

  const responseGoogleError = (error) => {
    console.log(error);
  };
  return (
    <div>
      <GoogleLogin
        clientId={clientId}
        buttonText="sign in with google"
        onSuccess={responseGoogleSuccess}
        onFailure={responseGoogleError}
        cookiePolicy={"single_host_origin"}
        responseType="code"
        accessType="offline"
        scope="openid email profile https://www.googleapis.com/auth/calendar  https://www.googleapis.com/auth/calendar.readonly"
      />
    </div>
  );
}
