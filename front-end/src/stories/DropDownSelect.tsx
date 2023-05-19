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
import "../App.css";

interface DropDownSelectProps {
  name: string;
  label: string;
  data: object[];
  formType?: string;
  className?: string;
  disabled: boolean;
  showHint?: string;
  onChange?: (value: object | undefined) => object | void;
  placeholder: string;
  prefix?: any;
  style?: object;
}

export const DropDownSelect = ({
  name,
  label,
  data,
  className,
  disabled,
  showHint,
  onChange,
  placeholder,
  style,
}: DropDownSelectProps) => {
  const [field, meta] = useField(name);

  return (
    <>
      <div className="input" style={style}>
        <div className="position-relative">
          <Form layout="vertical">
            <Form.Item
              label={label}
              name={label}
              rules={[{ message: meta.error }]}
            >
              <Field
                as={Select}
                name={name}
                options={data}
                label={label}
                disabled={disabled}
                onChange={onChange ? onChange : field.onChange}
                placeholder={placeholder}
                status={meta.error && meta.touched && "error"}
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

DropDownSelect.defaultProps = {
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
