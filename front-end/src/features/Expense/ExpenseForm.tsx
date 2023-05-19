import { Form, Formik } from "formik";
import { DatePickerField } from "../../stories/DatePickerField";
import { DropDownSelect } from "../../stories/DropDownSelect";
import { InputField } from "../../stories/InputField";
import { InputNumberField } from "../../stories/InputNumberField";
import { object, string, number, date } from "yup";
import { useAppDispatch, useAppSelector } from "../../app/store/hooks";
import "./Expense.css";
import { useEffect } from "react";
import { getCategories } from "./expenseSlice";

const validationSchema = object({
  name: string().required("Required*"),
  amount: string().min(0).required("Required*"),
  date: string().required("Required*"),
  categoryId: string().required("Required*"),
});

interface ExpenseFormProps {
  initialValues: {
    name: string;
    amount: string;
    date: string;
  };
  handleSubmit: (values: any) => void;
  toggleModalExpense: () => boolean | void;
  formRef: any;
  type: string;
}

const ExpenseForm = ({
  initialValues,
  handleSubmit,
  toggleModalExpense,
  formRef,
  type,
}: ExpenseFormProps) => {
  const dispatch = useAppDispatch();

  const { categoriesLoading, categoriesData, categoriesError } = useAppSelector(
    (state: any) => {
      return state.expenses;
    }
  );

  // useEffect(() => {
  //   dispatch(getCategories());
  // }, [dispatch]);

  console.log("initialValues", initialValues);

  return (
    <div>
      <>
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
          innerRef={(el: any) => {
            formRef.current = el;
          }}
          enableReinitialize={true}
        >
          {({ values, errors, touched, isSubmitting, setFieldValue }) => (
            <Form>
              <div className="form-input">
                <InputField
                  name="name"
                  label="Expense Name"
                  placeholder="Enter Name"
                  style={{
                    width: "250px",
                    display: "inline-block",
                    marginRight: "20px",
                  }}
                />
                <InputNumberField
                  name="amount"
                  label="Amount"
                  placeholder="$"
                  style={{ width: "100px" }}
                  min={0}
                  max={1000}
                  onChange={(value) => {
                    setFieldValue("amount", value);
                  }}
                />

                <div className="form-input">
                  <DropDownSelect
                    name="categoryId"
                    label="Category"
                    placeholder="Select"
                    style={{ width: 200, display: "inline-block" }}
                    onChange={(value) => {
                      setFieldValue("categoryId", value);
                    }}
                    data={categoriesData.filter((ele: any) => {
                      return ele.name !== "Uncategorised";
                    })}
                  />

                  <DatePickerField
                    name="date"
                    label="Date"
                    style={{
                      width: "190px",
                      display: "inline-block",
                      backgroundColor: "#ffff",
                    }}
                  />
                </div>
              </div>
            </Form>
          )}
        </Formik>
      </>
    </div>
  );
};

export default ExpenseForm;
