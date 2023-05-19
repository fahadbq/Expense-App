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
import { FormLayout } from "antd/es/form/Form";
import { Option } from "antd/es/mentions";

interface InputFieldProps {
  name: string;
  label: string;
  formType?: string;
  className?: string;
  disabled: boolean;
  showHint?: string;
  onChange?: (e: any) => void;
  placeholder: string;
  prefix?: any;
  style: object;
  layout?: FormLayout | undefined;
  addonBefore?: any;
}

export const InputField = ({
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
  layout,
  addonBefore,
}: InputFieldProps) => {
  const [field, meta] = useField(name);

  return (
    <>
      <div className="input" style={style}>
        <div className="position-relative">
          <Form layout={layout}>
            <Form.Item
              label={label}
              name={label}
              rules={[{ message: meta.error }]}
            >
              <Field
                as={Input}
                name={name}
                label={label}
                disabled={disabled}
                onChange={onChange ? onChange : field.onChange}
                placeholder={placeholder}
                status={meta.error && meta.touched && "error"}
                prefix={prefix}
                addonBefore={addonBefore && addonBefore}
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

InputField.defaultProps = {
  name: "Demo",
  label: "Enter Demo",
  formType: "",
  className: "form-input m-0",
  disabled: false,
  showHint: true,
  placeholder: "",
  prefix: "",
  style: {},
  layout: "vertical",
};
