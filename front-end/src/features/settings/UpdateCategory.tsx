import { Button, Popconfirm } from "antd";
import React, { useRef, useState } from "react";
import { deleteCategory, getCategories, updateCategory } from "./settingsSlice";
import { useAppDispatch, useAppSelector } from "../../app/store/hooks";
import { Form, Formik, FormikProps } from "formik";
import { object, string } from "yup";
import { InputField } from "../../stories/InputField";
import { NotificationIcon } from "../../app/components/NotificationIcon";

interface DeleteCategoryProps {
  item: {
    _id: string;
    name: string;
  };
}

type FormValues = {
  name: string;
};

const UpdateCategory = ({ item }: DeleteCategoryProps) => {
  const dispatch = useAppDispatch();

  const formRef = useRef<FormikProps<FormValues>>(null);

  const [errorMessage, setErrorMessage] = useState(false);

  const [categoryModal, setCategoryModal] = useState(false);
  const toggleCategory = () => setCategoryModal(!categoryModal);

  const { budgetData, categoriesUpdateLoading, categoriesUpdateError } =
    useAppSelector((state: any) => {
      return state.settings;
    });

  // Category Form
  const CategoryForm = ({ handleSubmitCategory }: any) => (
    <Formik
      initialValues={{ name: item.name || "" }}
      validationSchema={object({
        name: string().required("Required*"),
      })}
      onSubmit={handleSubmitCategory}
      innerRef={formRef}
      enableReinitialize
    >
      {({ handleSubmit }) => (
        <Form>
          <InputField
            name="name"
            placeholder="Category name here"
            label="Category"
            layout="vertical"
          />
        </Form>
      )}
    </Formik>
  );

  //Trigger Submit
  const onUpdateCategory = async (obj: any) => {
    formRef?.current?.submitForm();
  };

  //HandleSubmit
  const handleSubmit = async (formData: any) => {
    const data = {
      ...formData,
    };

    try {
      const result = await dispatch(
        updateCategory({ data, id: item?._id })
      ).unwrap();

      dispatch(getCategories());
      toggleCategory();
    } catch (err) {
      // err toast
      setErrorMessage(true);
    }
  };

  return (
    <div>
      <Popconfirm
        title="Update Category"
        description={<CategoryForm handleSubmitCategory={handleSubmit} />}
        open={categoryModal}
        onConfirm={() => onUpdateCategory(item)}
        okButtonProps={{
          loading: categoriesUpdateLoading,
        }}
        onCancel={toggleCategory}
      >
        <Button
          onClick={toggleCategory}
          style={{ cursor: "pointer" }}
          disabled={item.name === "Uncategorised" || budgetData.length === 0}
        >
          Update
        </Button>
      </Popconfirm>

      <NotificationIcon
        show={errorMessage}
        type="error"
        message={categoriesUpdateError}
      />
    </div>
  );
};

export default UpdateCategory;
