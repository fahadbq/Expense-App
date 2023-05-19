import { useEffect } from "react";
import {
  Link,
  Outlet,
  useLocation,
  useNavigate,
  useSearchParams,
} from "react-router-dom";
// import ProlinkLogo from "../../assets/images/prolink-logo.svg";
// import ClientLogo from "../../assets/images/hcs-logo.svg";
import { useDispatch, useSelector } from "react-redux";
import ClientLogo from "../../assets/images/costrategix-logo.png";
// import "./PreLogin.css";
// import {
//   reset,
//   validateInviteToken,
// } from "../../features/authentication/authenticationSlice";
// import Loader from "../components/Loader";
// import { setColor } from "../utils/constant";

const PreLoginWrapper = () => {
  const [searchParams] = useSearchParams();
  const id = searchParams.get("id");
  const { pathname = "", key } = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  //   const userData = JSON.parse(localStorage.getItem("inviteeInfo"));

  let body = document.body;
  body.classList.add("prelogin");

  //   useEffect(() => {
  //     dispatch(reset());
  //   }, [dispatch]);

  //   useEffect(() => {
  //     if (
  //       id &&
  //       (pathname === "/create-password" || pathname === "/landing-page")
  //     ) {
  //       dispatch(
  //         validateInviteToken({
  //           inviteToken: id,
  //         })
  //       );
  //     }
  //   }, [dispatch, id, pathname]);

  //   if (inviteeDataLoading) {
  //     return <Loader />;
  //   }

  return (
    <div className="wrapper">
      <div className="container prelogin-container">
        <div className="login-left-section">
          <div className="logo-section-wrapper">
            {/* <img
              src={ProlinkLogo}
              alt="ProLinkLogo"
              className="img-fluid prolink-logo"
            />
            <img
              src={ClientLogo}
              alt="ProLinkLogo"
              className="img-fluid client-logo"
            /> */}
          </div>
          {/* <div className="vm-logo-section-wrapper">
            <div className="vms-heading">EMS</div>
            <p className="tagline">Expense Management System</p>
            <p className="version">Version 1.0</p>
          </div> */}
        </div>
        <div className="login-right-section">
          {/* <div className="login-right-section-header">
            <Link to="#" className="text-link">
              About Us
            </Link>
            <Link to="#" className="text-link">
              Contact
            </Link>
          </div> */}
          <div className="login-content-section">
            <Outlet />
          </div>

          {/* <div className="login-right-section-footer">
            Copyright &#169;2022 - Expense Management System
          </div> */}
        </div>
      </div>
    </div>
  );
};

export default PreLoginWrapper;
