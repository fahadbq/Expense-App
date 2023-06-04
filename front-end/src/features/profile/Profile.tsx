import "./Profile.css";

import { Form, Formik } from "formik";
import { object, string, mixed, number, date } from "yup";
import { InputField } from "../../stories/InputField";
import { useAppDispatch, useAppSelector } from "../../app/store/hooks";
import { Select, Form as AntForm, Button } from "antd";

import {
  getUser,
  updateUserProfile,
} from "../authentication/authenticationSlice";
import ProfileUpload from "./ProfileUpload";
const validationSchema = object({
  name: string().required("Required*"),
  phone: string().test("isPhoneNumber", "Phone is not valid", (value: any) =>
    value?.match(/^\d{10}$/) ? true : false
  ),
  // occupation: string().required("Required*"),
  // picture: mixed().required("Picture is required*"),
});

const Profile = ({}) => {
  const dispatch = useAppDispatch();

  const { userData } = useAppSelector((state) => state.authentication);

  const initialValues = {
    email: userData?.email || "",
    name: userData.profile?.name || "",
    phone: userData.profile?.phone || "",
    occupation: userData.profile?.occupation || "",
    picture: userData.profile?.picture || null,
  };

  const handleSubmitProfile = async ({
    name,
    occupation,
    phone,
    picture,
    byteArray,
  }: any) => {
    const formData = {
      data: {
        name,
        occupation,
        phone,
        picture,
      },
      id: userData._id,
    };

    try {
      const result = await dispatch(updateUserProfile(formData)).unwrap();

      dispatch(getUser());

      localStorage.setItem("imageInLocal", byteArray);
      // toggleModalExpense();
    } catch (err) {
      // err toast
      // setErrToast(true);
    }
  };

  return (
    <div className="profile-container">
      <>
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={handleSubmitProfile}
          enableReinitialize={true}
        >
          {({
            values,
            errors,
            dirty,
            isValid,
            isSubmitting,
            setFieldValue,
            handleSubmit,
          }) => (
            <Form encType="multipart/form-data">
              <div className="profile-image">
                <ProfileUpload />
              </div>
              <div className="form-input">
                <InputField
                  name="name"
                  label="User Name"
                  placeholder="Enter Your Name"
                  style={{
                    width: "250px",
                    display: "inline-block",
                    marginRight: "20px",
                  }}
                />

                <InputField
                  name="email"
                  label="Email"
                  placeholder=""
                  style={{
                    width: "250px",
                    display: "inline-block",
                    marginRight: "20px",
                  }}
                  disabled={true}
                />

                <div className="form-input">
                  <InputField
                    name="occupation"
                    label="Occupation"
                    placeholder="Enter Your Occupation"
                    style={{
                      width: "300px",
                      display: "inline-block",
                      marginRight: "20px",
                    }}
                  />

                  <InputField
                    name="phone"
                    label="Phone"
                    placeholder="Enter Your Phone"
                    style={{ width: "150px", display: "inline-block" }}
                    onChange={(e: any) => {
                      const value = e.target.value;
                      if (value.length <= 10) {
                        setFieldValue("phone", value);
                      }
                    }}
                  />
                </div>

                <div className="save-button">
                  <Button
                    type="primary"
                    className="submit-button"
                    onClick={() => handleSubmit()}
                    disabled={isSubmitting || !(isValid && dirty)}
                  >
                    Save
                  </Button>
                </div>
              </div>
            </Form>
          )}
        </Formik>
      </>
    </div>
  );
};

export default Profile;
