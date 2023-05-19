import React, { useEffect, useRef, useState } from "react";
import { Alert, Button, Modal, Popconfirm } from "antd";
import { useAppDispatch, useAppSelector } from "../../app/store/hooks";
import "./Expense.css";
import ExpenseForm from "./ExpenseForm";
import { FormikProps } from "formik";
import { EditFilled, DeleteFilled } from "@ant-design/icons";
import {
  createExpense,
  deleteExpense,
  getExpenses,
  toggleShowUndoAlert,
  updateExpense,
} from "./expenseSlice";
import { NotificationIcon } from "../../app/components/NotificationIcon";
import moment from "moment";

type FormValues = {};

interface editExpenseProps {
  amount: string;
  categoryId: string;
  date: string;
  name: string;
}

const EditOrDeleteExpense = ({ expenseDetails, expensesData }: any) => {
  const dispatch = useAppDispatch();

  const { userData } = useAppSelector((state: any) => {
    return state.authentication;
  });

  const { categoriesError, deleteExpenseLoading } = useAppSelector(
    (state: any) => {
      return state.expenses;
    }
  );

  const { budgetData } = useAppSelector((state: any) => {
    return state.settings;
  });

  const [modalExpense, setModalExpense] = useState(false);
  const [errToast, setErrToast] = useState(false);

  const [deleteModal, setDeleteModal] = useState(false);

  const formRef = useRef<FormikProps<FormValues>>(null);

  const toggleModalExpense = () => setModalExpense(!modalExpense);

  const toggleDeleteExpense = () => setDeleteModal(!deleteModal);

  useEffect(() => {
    deleteModal &&
      setTimeout(() => {
        toggleDeleteExpense();
      }, 1500);
  }, [deleteModal]);

  const initialValues = {
    name: expenseDetails.name || "",
    amount: expenseDetails.amount || "",
    date: expenseDetails.date || "",
    categoryId: expenseDetails.categoryId || "",
  };

  const handleSubmit = async (formData: any) => {
    const data = {
      name: formData.name,
      amount: formData.amount,
      categoryId: formData.categoryId,
      userId: userData._id,
      date: moment(formData?.date, "YYYY-MM-DD"),
    };

    console.log("formData", formData);

    try {
      const result = await dispatch(
        updateExpense({ data, id: expenseDetails._id })
      ).unwrap();

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

  //Delete Expense
  const handleDelete = async () => {
    console.log("e", expenseDetails._id);

    try {
      const result = await dispatch(
        deleteExpense({ id: expenseDetails._id })
      ).unwrap();

      dispatch(getExpenses());
      // toggleModalExpense();
      toggleDeleteExpense();
    } catch (err) {
      // err toast
      setErrToast(true);
    }
  };

  return (
    <div>
      {/* <Button type="primary" onClick={toggleModalExpense}>
        Edit Expense
      </Button> */}
      <button
        onClick={toggleModalExpense}
        style={{
          cursor: "pointer",
          paddingRight: "7px",
          border: "none",
          outline: "none",
          background: "none",
        }}
        disabled={budgetData.length === 0}
      >
        <EditFilled />
      </button>

      <Popconfirm
        title="Delete Expense"
        description="Are you sure ?"
        open={deleteModal}
        onConfirm={handleDelete}
        okButtonProps={{ loading: deleteExpenseLoading }}
        onCancel={toggleDeleteExpense}
      >
        {/* <Button type="primary" onClick={toggleDeleteExpense}>
          Open Popconfirm with async logic
        </Button> */}

        <button
          onClick={toggleDeleteExpense}
          style={{
            cursor: "pointer",
            border: "none",
            outline: "none",
            background: "none",
          }}
          disabled={
            budgetData.length === 0 ||
            expenseDetails.categoryName === "Uncategorised"
          }
        >
          <DeleteFilled />
        </button>
      </Popconfirm>

      {/* <span onClick={() => handleDelete()} style={{ cursor: "pointer" }}>
        <DeleteFilled />
      </span> */}
      <Modal
        title="Edit Expense"
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
          type="edit"
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

export default EditOrDeleteExpense;
