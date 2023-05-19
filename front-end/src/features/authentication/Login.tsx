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
import { useAppDispatch, useAppSelector } from "../../app/store/hooks";
import { loginUser, registerUser } from "./authenticationSlice";
import { Link, useNavigate } from "react-router-dom";
import { NotificationIcon } from "../../app/components/NotificationIcon";
import { UserOutlined } from "@ant-design/icons";
import GoogleLoginButton from "./GoogleLogin";

const validationSchema = object({
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

const Login: React.FC = () => {
  //Password requirement Validation
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const [toastMessage, setToastMessage] = useState(false);

  const toggleToast = () => setToastMessage(!toastMessage);

  const { loginError } = useAppSelector((state: any) => {
    return state.authentication;
  });

  console.log("toastMessage", toastMessage);

  console.log("loginError", loginError);

  const handleSubmitLogin = async (formData: object, { resetForm }: any) => {
    console.log("formData", formData);

    toggleToast();

    try {
      const response = await dispatch(loginUser(formData)).unwrap();
      resetForm();
      localStorage.setItem("token", response.Authorization);
      navigate("/settings");
    } catch (e) {
      setToastMessage(true);
      console.log("err", e);
    }
  };

  return (
    <div className="login-container">
      <Formik
        initialValues={{
          email: "",
          password: "",
        }}
        validationSchema={validationSchema}
        onSubmit={handleSubmitLogin}
      >
        {({ values, errors, touched, isSubmitting, handleSubmit }) => (
          <>
            {console.log("values", values)}
            {console.log("errors", errors)}
            <Form className="login-form">
              <h1>Sign in</h1>
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

              <div className="password-requirements">
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
              </div>

              <Button
                className="landing-page-button "
                type="primary"
                onClick={() => handleSubmit()}
                loading={isSubmitting}
                disabled={!touched}
              >
                Sign in
              </Button>

              <p className="paragraph-font">
                New Here?{" "}
                <span className="link">
                  <Link to="/register">Sign Up</Link>
                </span>
              </p>

              <div className="line-with-text">
                <div className="line"></div>
                <div className="text">or</div>
                <div className="line"></div>
              </div>
              <div style={{ margin: "5px" }}>
                {/* <GoogleLoginPage /> */}

                <GoogleLoginButton />
              </div>
            </Form>
          </>
        )}
      </Formik>

      <NotificationIcon
        show={loginError.length > 0 && toastMessage}
        type="error"
        message={loginError}
        onClose={toggleToast}
      />
    </div>
  );
};

export default Login;
