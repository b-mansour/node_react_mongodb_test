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
        scope:
          "openid email profile https://www.googleapis.com/auth/calendar  https://www.googleapis.com/auth/calendar.readonly",
      });
    }

    gapi.load("client:auth2", start);
  });

  function responseGoogleSuccess(response) {
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

    getEvents();
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
          let events = response.result.items;
          // console.log(events);
          // todo: add events to db
          addEvents(events);
        });
      });
    });
  }

  function addEvents(events) {
    // console.log(events);
    const headers = {
      "Content-Type": "application/json",
      access_token: gapi.client.getToken().access_token,
    };

    axios
      .post("http://localhost:4000/events/add-events", events, {
        headers: headers,
      })
      .then((response) => {
        console.log(response);
      })
      .catch((error) => {
        console.log(error);
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
