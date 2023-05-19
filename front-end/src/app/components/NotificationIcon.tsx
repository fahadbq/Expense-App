import React from "react";
import PropTypes from "prop-types";
import { capitalizeFirstLetter } from "../utils/constant";
import { Button, Divider, notification, Space } from "antd";
import type { NotificationPlacement } from "antd/es/notification/interface";
import { Alert, Input, message as antMessage } from "antd";

interface NotificationIconProps {
  show: any;
  onClose(): void;
  type: "success" | "info" | "warning" | "error" | undefined;
  message: string;
  duration?: number;
}

export const NotificationIcon = ({
  show,
  onClose,
  type,
  message,
  duration,
}: NotificationIconProps) => {
  const [messageApi, contextHolder] = antMessage.useMessage();

  const onCall = () => {
    messageApi.open({
      type: type,
      content: message,
      duration: duration,
      onClose: () => onClose,
    });
  };

  return (
    <>
      {show && onCall()}
      {contextHolder}
    </>
  );
};

// NotificationIcon.propTypes = {
//   show: PropTypes.bool.isRequired,
//   onClose: PropTypes.func.isRequired,
//   type: PropTypes.string,
//   message: PropTypes.string,
// };

NotificationIcon.defaultProps = {
  show: false,
  onClose: () => {},
  type: "", //warning, error, info, none
  message: "",
  duration: 1,
};
