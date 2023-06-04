import React, { useEffect } from "react";
import { Spin } from "antd";
import "./App.css";

const AuthenticateGoogleToken = () => {
  useEffect(() => {
    const handleSuccessPage = () => {
      // Get the token from the URL query parameters
      const urlParams = new URLSearchParams(window.location.search);
      const token = urlParams.get("id");

      if (token) {
        // Process the token as needed

        // Perform further actions with the token
        // You can save it to local storage, set it as a bearer token in the authorization header, etc.

        // Example: Save the token to local storage
        localStorage.setItem("token", token);

        // Redirect the user to the desired page or perform other actions
        // Example: Redirect to the dashboard page
        window.location.href = "/settings";
      } else {
        // Token is missing or invalid
        // Handle the error accordingly
        console.error("Invalid token");
        // Example: Redirect to the login page with an error message
        window.location.href = "/";
      }
    };

    handleSuccessPage();
  }, []);

  return (
    <div className="loader">
      <Spin />
    </div>
  );
};

export default AuthenticateGoogleToken;
