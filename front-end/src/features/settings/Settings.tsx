import React, { useEffect, useState } from "react";
import "./Settings.css";
import { Button, Input, Popconfirm, Space, notification } from "antd";
import { InputField } from "../../stories/InputField";
import { Formik, Form } from "formik";
import { object, string } from "yup";
import { useAppDispatch, useAppSelector } from "../../app/store/hooks";
import { Divider, List, Typography } from "antd";
import {
  createBudget,
  createCategory,
  deleteCategory,
  getBudget,
  getCategories,
  updateBudget,
} from "./settingsSlice";
import EditOutlined from "@ant-design/icons";
import { InputNumberField } from "../../stories/InputNumberField";
import type { NotificationPlacement } from "antd/es/notification/interface";
import DeleteCategory from "./DeleteCategory";
import UpdateCategory from "./UpdateCategory";
import { BUGET_MESSAGE } from "../../app/utils/constant";

const Settings = () => {
  const dispatch = useAppDispatch();

  const [api, contextHolder] = notification.useNotification();
  const [displayedNotifications, setDisplayedNotifications] = useState<
    string[]
  >([]);

  useEffect(() => {
    dispatch(getCategories());
    dispatch(getBudget());
  }, [dispatch]);

  const {
    categoriesLoading,
    categoriesData,
    categoriesError,
    budgetLoading,
    budgetData,
    budgetError,
  } = useAppSelector((state: any) => {
    return state.settings;
  });

  const { userData } = useAppSelector((state: any) => {
    return state.authentication;
  });

  const openNotification = (
    placement: NotificationPlacement,
    BUGET_MESSAGE: string,
    title: string,
    duration: number
  ) => {
    // Check if the title is already in the displayed notifications
    const isNotificationDisplayed = displayedNotifications.includes(title);

    // Only open a new notification if it is not already displayed
    if (!isNotificationDisplayed) {
      api.open({
        placement,
        message: title,
        description: BUGET_MESSAGE,
        duration: duration,
      });

      // Add the title to the displayed notifications
      setDisplayedNotifications([...displayedNotifications, title]);
    }
  };

  useEffect(() => {
    if (
      budgetLoading &&
      budgetData.length <= 0 &&
      !displayedNotifications.includes("WelcomeNotification")
    ) {
      openNotification(
        "top",
        BUGET_MESSAGE,
        "Welcome to Expense Management!.",
        5
      );
    }
  }, [budgetData, budgetLoading, displayedNotifications]);

  return (
    <div className="settings-container">
      <div>
        <Formik
          initialValues={{ amount: budgetData[0]?.amount || "" }}
          validationSchema={object({
            amount: string()
              .required("Required*")
              .min(0, "Min value is required"),
          })}
          onSubmit={async (e) => {
            if (budgetData.length === 0) {
              const formData = { ...e, userId: userData._id };

              try {
                const result = await dispatch(createBudget(formData)).unwrap();

                dispatch(getBudget());
              } catch (err) {}

              //Update Budget
            } else {
              const formData = {
                data: { ...e, userId: userData._id },
                id: budgetData[0]?._id,
              };

              try {
                const result = await dispatch(updateBudget(formData)).unwrap();

                dispatch(getBudget());
              } catch (err) {}
            }
          }}
          enableReinitialize
        >
          {({ handleSubmit, setFieldValue, isSubmitting, isValid, dirty }) => {
            return (
              <Form>
                <div>
                  <InputNumberField
                    layout="horizontal"
                    name="amount"
                    label="Total Budget"
                    placeholder="$"
                    style={{ width: "290px", marginRight: "20px" }}
                    min={1}
                    onChange={(value) => {
                      setFieldValue("amount", value);
                    }}
                  />

                  <Button
                    type="primary"
                    onClick={() => handleSubmit()}
                    className="submit-button"
                    disabled={!(isValid && dirty) || isSubmitting}
                  >
                    {budgetData.length === 0 ? "Submit" : "Update"}
                  </Button>
                </div>
              </Form>
            );
          }}
        </Formik>
      </div>

      <div>
        <Formik
          initialValues={{ name: "" }}
          validationSchema={object({
            name: string().required("Required*"),
          })}
          onSubmit={async (e) => {
            console.log("e", e);

            const formData = { ...e, userId: userData._id };

            try {
              const result = await dispatch(createCategory(formData)).unwrap();

              dispatch(getCategories());
              // toggleModalExpense();
            } catch (err) {
              // err toast
              // setErrToast(true);
            }
          }}
          enableReinitialize
        >
          {({ handleSubmit, isValid, dirty, isSubmitting }) => (
            <Form>
              <InputField
                name="name"
                placeholder="Category name here"
                label="Categories"
                layout="horizontal"
                style={{
                  width: "370px",
                  display: "inline-block",
                  marginRight: "20px",
                }}
              />

              <Button
                type="primary"
                onClick={() => handleSubmit()}
                disabled={
                  budgetData.length === 0 || !(isValid && dirty) || isSubmitting
                }
                className="submit-button"
              >
                Submit
              </Button>
            </Form>
          )}
        </Formik>
      </div>

      <div className="list-container">
        {categoriesData.length > 0 && (
          <List
            header={<h3>Categories</h3>}
            // footer={<div>Footer</div>}
            bordered
            dataSource={categoriesData || []}
            renderItem={(item: any) => (
              <div>
                <List.Item
                  actions={[
                    <UpdateCategory item={item} />,

                    <DeleteCategory item={item} />,
                  ]}
                >
                  <Typography.Text mark></Typography.Text> {item.name}
                </List.Item>
              </div>
            )}
          />
        )}
      </div>

      {contextHolder}
      {budgetError && openNotification("bottom", budgetError, "error", 3)}
    </div>
  );
};

export default Settings;
