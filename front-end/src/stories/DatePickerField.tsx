import {
  Cascader,
  DatePicker,
  Form,
  Input,
  InputNumber,
  Mentions,
  Select,
  TimePicker,
  TreeSelect,
} from "antd";
import { Field, useField, useFormikContext } from "formik";
import { useEffect, useState } from "react";
import moment from "moment";
import type { DatePickerProps } from "antd";

// import "../App.css";

interface DatePickerFieldProps {
  name: string;
  label: string;
  style: object;
  onChange?: (
    string: object | string | undefined
  ) => object | string | undefined;
}

export const DatePickerField = ({
  name,
  label,
  style,
  onChange,
}: DatePickerFieldProps) => {
  const { setFieldValue } = useFormikContext<{ date: any }>();
  const [field, meta] = useField(name);

  return (
    <>
      <div style={style}>
        <div className="position-relative">
          <Form layout="vertical">
            <Form.Item
              label={label}
              name={label}
              rules={[{ message: meta.error }]}
            >
              <Field
                as={DatePicker}
                label={label}
                name={name}
                status={meta.error && meta.touched ? "error" : ""}
                format="YYYY-MM-DD"
                onChange={(date: any, dateString: any) => {
                  setFieldValue("date", date.format());
                }}
                value={field.value ? moment(field.value) : null}
                placement={"topLeft"}
              />

              <div>
                {meta.error && meta.touched && (
                  <span className="error-message"> {meta.error} </span>
                  // ) : (
                  //   formType !== "view" &&
                  //   showHint && (
                  //     <Hint>
                  //       Required<sup className="star">*</sup>
                  //     </Hint>
                  //   )
                )}
              </div>
            </Form.Item>
          </Form>
        </div>
      </div>
    </>
  );
};

DatePickerField.defaultProps = {
  name: "Demo",
  label: "Enter Demo",
  formType: "",
  className: "form-input m-0",
  disabled: false,
  showHint: true,
  placeholder: "",
  prefix: "",
  style: {},
};
