import React, { Profiler, useEffect } from "react";
import "./App.css";
import { Routes, Route, useNavigate } from "react-router-dom";
import PreLoginWrapper from "./app/container/PreLoginWrapper";
import SignUp from "./features/authentication/SignUp";
import Login from "./features/authentication/Login";
import PostLoginWrapper from "./app/container/PostLoginWrapper";
import Container from "./features/authentication/Container";
import Settings from "./features/settings/Settings";
import Profile from "./features/profile/Profile";
import PrivateRoute from "./features/authentication/PrivateRoute";
import ExpenseContainer from "./features/Expense/ExpenseContainer";
import AuthenticateGoogleToken from "./AuthenticateGoogleToken";

function App() {
  const navigate = useNavigate();

  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Container />} />
        {/* Google Login */}
        <Route path="/auth/success" element={<AuthenticateGoogleToken />} />
        <Route element={<PreLoginWrapper />}>
          <Route path="/register" element={<SignUp />} />
          <Route path="/login" element={<Login />} />
        </Route>

        <Route element={<PrivateRoute />}>
          <Route element={<PostLoginWrapper />}>
            <Route path="/expenses" element={<ExpenseContainer />} />
            <Route path="/settings" element={<Settings />} />
            <Route path="/profile" element={<Profile />} />
          </Route>
        </Route>
      </Routes>
    </div>
  );
}

export default App;
