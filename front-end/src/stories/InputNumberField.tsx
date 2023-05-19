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
import { Field, useField } from "formik";
import { FormLayout } from "antd/es/form/Form";
import "../App.css";

interface InputNumberFieldProps {
  name: string;
  label: string;
  formType?: string;
  className?: string;
  disabled: boolean;
  showHint?: string;
  onChange?: (value: string | number) => string | number | void;
  placeholder: string;
  prefix?: any;
  style: object;
  min: number;
  max: number;
  formatter?: (number: string | number) => string | number;
  layout?: FormLayout | undefined;
}

export const InputNumberField = ({
  name,
  label,
  formType,
  className,
  disabled,
  showHint,
  onChange,
  placeholder,
  prefix,
  style,
  min,
  max,
  formatter,
  layout,
}: InputNumberFieldProps) => {
  const [field, meta] = useField(name);

  return (
    <>
      <div className="input-number">
        <div className="position-relative">
          <Form layout={layout}>
            <Form.Item
              label={label}
              name={label}
              rules={[{ message: meta.error }]}
            >
              <Field
                value={field.value}
                as={InputNumber}
                name={name}
                label={label}
                disabled={disabled}
                onChange={onChange ? onChange : field.onChange}
                placeholder={placeholder}
                status={meta.error && meta.touched && "error"}
                prefix={prefix}
                min={min}
                max={max}
                formatter={formatter}
                step={1}
                style={style}
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

InputNumberField.defaultProps = {
  name: "Demo",
  label: "Enter Demo",
  formType: "",
  className: "form-input m-0",
  disabled: false,
  showHint: true,
  placeholder: "",
  prefix: "",
  style: { width: "200px" },
  min: 0,
  max: 9999999999,
  formatter: (value: string | number) =>
    `$ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ","),
  layout: "vertical",
};
