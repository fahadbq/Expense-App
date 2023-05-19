import { Button } from "antd";
import React from "react";
import { useNavigate } from "react-router-dom";
import "./Authenticate.css";

const Container: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="login-container">
      <div className="landing-page">
        <i
          className="fas fa-hand-holding-usd"
          style={{ fontSize: "4em", padding: "30px", opacity: "0.9" }}
        ></i>

        <h1 style={{ marginBottom: "20px" }}>
          Welcome to Expense Management System
        </h1>
        <span style={{ marginBottom: "20px" }}>
          Log in with your Expense account to continue
        </span>

        <div className="landing-button">
          <Button
            size={"large"}
            onClick={() => {
              navigate("/login");
            }}
            className="landing-page-button"
          >
            Login
          </Button>

          <Button
            size={"large"}
            onClick={() => {
              navigate("/register");
            }}
            className="landing-page-button"
          >
            Sign Up
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Container;
