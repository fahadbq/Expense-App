import React, { useRef, useState } from "react";
import {
  Button,
  DatePicker,
  Dropdown,
  InputNumber,
  Modal,
  Select,
  Space,
} from "antd";
import { useAppDispatch, useAppSelector } from "../../app/store/hooks";
import "./Expense.css";
import ExpenseForm from "./ExpenseForm";
import { FormikProps } from "formik";
import { createExpense, getExpenses } from "./expenseSlice";

import { NotificationIcon } from "../../app/components/NotificationIcon";
import moment from "moment";

type FormValues = {};

const AddExpense: React.FC = () => {
  const dispatch = useAppDispatch();

  const { userData } = useAppSelector((state: any) => {
    return state.authentication;
  });

  const { categoriesError } = useAppSelector((state: any) => {
    return state.expenses;
  });

  const [modalExpense, setModalExpense] = useState(false);
  const [errToast, setErrToast] = useState(false);

  const formRef = useRef<FormikProps<FormValues>>(null);

  const toggleModalExpense = () => setModalExpense(!modalExpense);

  const initialValues = { name: "", amount: "", date: "", categoryId: "" };

  const { budgetData } = useAppSelector((state: any) => {
    return state.settings;
  });

  const handleSubmit = async (formData: any) => {
    const data = {
      name: formData.name,
      amount: formData.amount,
      categoryId: formData.categoryId,
      userId: userData._id,
      date: moment(formData?.date, "YYYY-MM-DD"),
    };

    try {
      const result = await dispatch(createExpense(data)).unwrap();

      dispatch(getExpenses());
      toggleModalExpense();
    } catch (err) {
      // err toast
      setErrToast(true);
    }
  };

  const handleOk = (e: React.MouseEvent<HTMLElement>) => {
    formRef?.current?.submitForm();
  };

  return (
    <div>
      <Button
        type="primary"
        onClick={toggleModalExpense}
        disabled={budgetData.length === 0}
        className="submit-button"
      >
        Add Expense
      </Button>
      <Modal
        title="Add Expense"
        centered
        open={modalExpense}
        okText="Submit"
        onOk={handleOk}
        destroyOnClose={true}
        onCancel={toggleModalExpense}
        width={450}
      >
        <ExpenseForm
          initialValues={initialValues}
          handleSubmit={handleSubmit}
          toggleModalExpense={toggleModalExpense}
          formRef={formRef}
          type="add"
        />
      </Modal>
      <NotificationIcon
        show={errToast}
        type="error"
        message={categoriesError}
      />
    </div>
  );
};

export default AddExpense;
