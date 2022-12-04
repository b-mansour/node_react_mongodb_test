import { GoogleLogin } from "react-google-login";
import { gapi } from "gapi-script";
import { useEffect, useContext } from "react";
// import { AppContext } from "../App";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function Login() {
  // const { accessToken, setAccessToken } = useContext(AppContext);
  const clientId = process.env.REACT_APP_GOOGLE_CLIENT_ID;
  const navigate = useNavigate();

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
    // console.log(gapi.client.getToken());
    // console.log(response);
    // var auth2 = gapi.auth2.getAuthInstance();
    // var profile = auth2.currentUser.get().getBasicProfile();

    // console.log(profile.getName());
    // console.log(profile.getEmail());
    const { code } = response;

    console.log(gapi.client.getToken());
    axios
      .post("http://localhost:4000/users/create-token", { code })
      .then((response) => {
        console.log(response.data);
      })
      .catch((error) => {
        console.log(error.message);
      });

    getEvents();
    // navigate("/");
  }

  // Gets user events from google calendar and add it to db
  async function getEvents() {
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
          console.log(events);
          // add user's google events to db;
          addEvents(events);
        });
      });
    });
  }

  function addEvents(events) {
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
        isSignedIn={true}
        scope="openid email profile https://www.googleapis.com/auth/calendar  https://www.googleapis.com/auth/calendar.readonly"
      />
    </div>
  );
}
