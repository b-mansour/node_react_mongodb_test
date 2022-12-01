import React from "react";
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
  });

  // const access_token = gapi.auth.getToken().access_token;

  function responseGoogleSuccess(response) {
    // console.log(response);
    const { code } = response;
    // console.log(code);
    axios
      .post("http://localhost:4000/users/create-token", { code })
      .then((response) => {
        console.log(response);
      })
      .catch((error) => {
        console.log(error.message);
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
        scope="openid email profile https://www.googleapis.com/auth/calendar"
      />
    </div>
  );
}
