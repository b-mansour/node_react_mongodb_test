import React from "react";
import { GoogleLogout } from "react-google-login";

export default function Logout() {
  const clientId = process.env.REACT_APP_GOOGLE_CLIENT_ID;

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
