import React from "react";
import { GoogleLogout } from "react-google-login";

export default function Logout() {
  const clientId =
    "253515985377-56lopgah31975a6d7o830ulokblb0opd.apps.googleusercontent.com";

  const onSuccess = () => {
    console.log("logged out successfully ");
  };

  return (
    <div id="signOutButton">
      <GoogleLogout
        clientId={clientId}
        buttonText="Logout"
        onLogoutSuccess={onSuccess}
      />
    </div>
  );
}
