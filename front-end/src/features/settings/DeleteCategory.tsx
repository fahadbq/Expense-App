import { Button, Popconfirm } from "antd";
import React, { useState } from "react";
import { deleteCategory, getCategories } from "./settingsSlice";
import { useAppDispatch, useAppSelector } from "../../app/store/hooks";

interface DeleteCategoryProps {
  item: {
    name: string;
  };
}

const DeleteCategory = ({ item }: DeleteCategoryProps) => {
  const dispatch = useAppDispatch();

  const [deleteModal, setDeleteModal] = useState(false);
  const toggleDeleteExpense = () => setDeleteModal(!deleteModal);

  const { deleteCategoriesLoading, budgetData } = useAppSelector(
    (state: any) => {
      return state.settings;
    }
  );

  const onDeleteCategory = async (obj: any) => {
    try {
      const result = await dispatch(deleteCategory(obj._id)).unwrap();

      dispatch(getCategories());
    } catch (err) {}
  };

  return (
    <div>
      <Popconfirm
        title="Delete Category"
        description="Are you sure ?"
        open={deleteModal}
        onConfirm={() => onDeleteCategory(item)}
        okButtonProps={{ loading: deleteCategoriesLoading }}
        onCancel={toggleDeleteExpense}
      >
        {/* <Button type="primary" onClick={toggleDeleteExpense}>
Open Popconfirm with async logic
</Button> */}

        <Button
          danger
          onClick={toggleDeleteExpense}
          style={{ cursor: "pointer" }}
          disabled={item.name === "Uncategorised" || budgetData.length === 0}
        >
          Delete
        </Button>
      </Popconfirm>
    </div>
  );
};

export default DeleteCategory;
