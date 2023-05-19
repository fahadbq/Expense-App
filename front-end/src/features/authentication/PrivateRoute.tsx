import { Navigate, Outlet } from "react-router-dom";

//HOC - Higher Order Component

const PrivateRoute = () => {
  return localStorage.getItem("token") ? <Outlet /> : <Navigate to="/" />;
};

export default PrivateRoute;
