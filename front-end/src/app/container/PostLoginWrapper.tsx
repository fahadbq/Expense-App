import "./PostLogin.css";
import React, { useEffect, useMemo, useState } from "react";
import { SettingFilled, UserOutlined, HomeFilled } from "@ant-design/icons";
import { Layout, Menu, theme } from "antd";
import { Link, Outlet, useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../store/hooks";
import "./PostLogin.css";
import { getUser } from "../../features/authentication/authenticationSlice";
import images from "../../assets/images/Expense-image.png";
import SizeContext from "antd/es/config-provider/SizeContext";
import { Avatar } from "antd";
import type { MenuProps } from "antd";
import { Button, Dropdown } from "antd";
import coolBackground from "../../assets/images/cool-background.png";

const PostLoginWrapper: React.FC = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const [collapsed, setCollapsed] = useState(true);

  useEffect(() => {
    dispatch(getUser());
  }, [dispatch]);

  const items: MenuProps["items"] = [
    {
      key: "1",
      label: (
        <Link
          // target="_blank"
          // rel="noopener noreferrer"
          // href="https://www.antgroup.com"
          to="/profile"
        >
          View Profile
        </Link>
      ),
    },
    {
      key: "",
      label: (
        <Link
          to="#"
          onClick={() => {
            localStorage.removeItem("token");
            navigate("/");
          }}
        >
          Log out
        </Link>
      ),
    },
  ];

  return (
    <div>
      <div className="main-container">
        <div
          className={`sidebar ${collapsed ? "collapsed" : ""}`}
          onMouseEnter={() => setCollapsed(false)}
          onMouseLeave={() => setCollapsed(true)}
        >
          <div className="sidebar-header">
            {/* User Icon */}

            {/* <img src={images} alt="logo" className="circular-image" /> */}
            <i className="fas fa-hand-holding-usd icon-expanded"></i>
          </div>

          <ul className="sidebar-menu">
            <li>
              <Link to="/expenses">
                <HomeFilled className="nav-icon" />
                {!collapsed && <span className="sidebar-text">Expenses</span>}
              </Link>
            </li>
            <li>
              <Link to="/settings">
                <SettingFilled className="nav-icon" />
                {!collapsed && <span className="sidebar-text">Settings</span>}
              </Link>
            </li>
            <li>
              <Link to="/profile">
                <UserOutlined className="nav-icon" />
                {!collapsed && <span className="sidebar-text"> Profile</span>}
              </Link>
            </li>
          </ul>
        </div>

        {/* User icon */}
        <Dropdown menu={{ items }} placement="bottomLeft">
          <Avatar
            className="user-icon"
            size={"large"}
            src={
              <img
                src={
                  "https://github.com/OlgaKoplik/CodePen/blob/master/profile.jpg?raw=true"
                }
                alt="avatar"
              />
            }
          ></Avatar>
        </Dropdown>
      </div>
      <hr className="soft-line"></hr>
      {/* Right side content */}
      <Outlet />
    </div>
  );
};

export default PostLoginWrapper;
