// import { Form } from "antd";
import { Formik, Form, Field } from "formik";
import { Alert, Button, Input, message } from "antd";
import { InputField } from "../../stories/InputField";
import { object, string } from "yup";
import { MailFilled } from "@ant-design/icons";
import { PasswordField } from "../../stories/PasswordField";
import {
  lowerCharRegex,
  numberRegex,
  passwordRegex,
  specialCharRegex,
  upperCharRegex,
} from "../../app/utils/constant";
// import PasswordRequirements from "./PasswordReqs";
import { useState } from "react";
import "./Authenticate.css";
import ReactPasswordChecklist from "react-password-checklist";
import { useAppDispatch } from "../../app/store/hooks";
import { registerUser } from "./authenticationSlice";
import { Link, useNavigate } from "react-router-dom";
import { NotificationIcon } from "../../app/components/NotificationIcon";
import { UserOutlined } from "@ant-design/icons";

const validationSchema = object({
  username: string().required("Username is required*"),
  email: string()
    .email("Invalid Email Format")
    .required("Invalid Email Format"),
  password: string()
    .trim()
    .matches(passwordRegex, "Your password doesn't meet the requirements")
    .test("Check Email", "Email address cannot be password", (value: any) => {
      const regex = new RegExp("[a-z0-9]+@[a-z]+.[a-z]{2,3}"); //Regex to match the password
      return value?.length > 1 && regex.test(value) ? false : true;
    })
    .required("Password is required"),
});

const SignUp: React.FC = () => {
  //Password requirement Validation
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const [toastMessage, setToastMessage] = useState(false);

  const toggleToast = () => setToastMessage(!toastMessage);

  const handleSubmit = async (formData: object, { resetForm }: any) => {
    console.log("formData", formData);

    try {
      const response = await dispatch(registerUser(formData)).unwrap();
      resetForm();
      navigate("/login");
      toggleToast();
      console.log("response", response);
    } catch (e) {}
  };

  return (
    <div className="login-container">
      <Formik
        initialValues={{
          username: "",
          email: "",
          password: "",
        }}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        {({ values, errors, touched, isSubmitting, handleSubmit }) => (
          <>
            {console.log("values", values)}
            {console.log("errors", errors)}
            <Form className="login-form">
              <h1>Register</h1>
              <InputField
                prefix={<UserOutlined />}
                placeholder="Enter your Username"
                label={"Username"}
                name="username"
              />
              <InputField
                prefix={<MailFilled />}
                placeholder="Enter your Email"
                label={"Email"}
                name="email"
              />
              <PasswordField
                placeholder="Enter your password"
                label={"Password"}
                name="password"
              />

              <ReactPasswordChecklist
                rules={["minLength", "specialChar", "number", "capital"]}
                minLength={6}
                value={values.password}
                messages={{
                  minLength: "Password should container alteast 6 caracters.",
                  specialChar: "Password has special characters.",
                  number: "Password has a number.",
                  capital: "Password has a capital letter.",
                }}
                onChange={(isValid) => {
                  console.log("isValid", isValid);
                }}
                iconSize={11}
                className="password-requirements"
              />

              <Button
                type="primary"
                onClick={() => handleSubmit()}
                loading={isSubmitting}
              >
                Sign Up
              </Button>

              <p className="paragraph-font">
                Already a user?
                <span className="link">
                  <Link to="/login">Sign In</Link>
                </span>
              </p>
            </Form>
          </>
        )}
      </Formik>
      <NotificationIcon
        show={toastMessage}
        type="success"
        message="Registered"
      />
    </div>
  );
};

export default SignUp;
