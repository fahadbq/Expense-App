import React, { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../app/store/hooks";
import { getExpenses, getCategories } from "./expenseSlice";
import { getBudget } from "../settings/settingsSlice";
import ExpenseList from "./ExpenseList";
import { Alert, Button, Card, Modal } from "antd";
import "./Expense.css";
import AddExpense from "./AddExpense";
import ExpenseCharts from "./Charts";
import Charts from "./Charts";

const ExpenseContainer = () => {
  const dispatch = useAppDispatch();

  const [filteredData, setFilteredData] = useState([]);

  const { expensesData = [], categoriesData = [] } = useAppSelector(
    (state: any) => {
      return state.expenses;
    }
  );

  //Search
  useEffect(() => {
    if (categoriesData.length > 0) {
      const result = structuredClone(expensesData);

      const newArray = result
        .map((item: any) => {
          const matchingItem = categoriesData?.find(
            (x: any) => x?._id === item?.categoryId
          );
          if (matchingItem) {
            return {
              ...item,
              categoryName: matchingItem?.name,
            };
          }
        })
        .reverse();

      setFilteredData(newArray);
    }
  }, [expensesData, categoriesData]);

  useEffect(() => {
    dispatch(getExpenses());
    dispatch(getCategories());
    dispatch(getBudget());
  }, [dispatch]);

  console.log("filteredData", filteredData);

  return (
    <div className="home-container">
      <Charts data={filteredData} categoriesData={categoriesData} />

      <ExpenseList expensesData={filteredData} />
    </div>
  );
};

export default ExpenseContainer;
