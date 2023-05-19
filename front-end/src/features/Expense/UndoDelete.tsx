import { Alert, Progress } from "antd";
import React, { useEffect, useState } from "react";
import { Link, NavLink } from "react-router-dom";
import {
  getExpenses,
  toggleShowUndoAlert,
  undoDeletedExpense,
} from "./expenseSlice";
import { useAppDispatch, useAppSelector } from "../../app/store/hooks";

interface UndoDeleteProps {
  id?: any;
}

const UndoDelete = ({ id }: UndoDeleteProps) => {
  const dispatch = useAppDispatch();

  const { undoDeleteId } = useAppSelector((state) => state.expenses);

  const [loading, setLoading] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      if (loading < 100) {
        setLoading(loading + 1);
      } else {
        dispatch(toggleShowUndoAlert(false));
        clearInterval(interval);
      }
    }, 30); // update every 100 milliseconds
    return () => clearInterval(interval);
  }, [dispatch, loading]);

  const handleUndoDelete = async () => {
    try {
      const result = await dispatch(
        undoDeletedExpense({ id: undoDeleteId })
      ).unwrap();

      dispatch(toggleShowUndoAlert(false));
      dispatch(getExpenses());
    } catch (err) {
      // err toast
      //   setErrToast(true);
    }
  };

  return (
    <div>
      {
        <Alert
          className="undo-alert-notification"
          message="Delete"
          type="warning"
          showIcon
          action={
            <>
              <Link
                to="#"
                type="text"
                style={{ paddingLeft: "20px", paddingRight: "10px" }}
                onClick={() => handleUndoDelete()}
              >
                <span style={{ textDecoration: "underline" }}>Undo</span>
              </Link>
              <Progress type="circle" percent={loading} size={23} />
            </>
          }
          closable
        />
      }
    </div>
  );
};

export default UndoDelete;
