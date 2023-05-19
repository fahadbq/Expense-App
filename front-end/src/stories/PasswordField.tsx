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
import { LockOutlined, UserOutlined } from "@ant-design/icons";
import { EyeInvisibleOutlined, EyeTwoTone } from "@ant-design/icons";
import "../App.css";

interface PasswordFieldProps {
  name: string;
  label: string;
  formType?: string;
  className?: string;
  disabled?: boolean;
  showHint?: string;
  onChange?: () => void;
  placeholder: string;
  prefix?: any;
}

export const PasswordField = ({
  name,
  label,
  formType,
  className,
  disabled,
  showHint,
  onChange,
  placeholder,
  prefix,
}: PasswordFieldProps) => {
  const [field, meta] = useField(name);

  return (
    <>
      <div className="input">
        <div className="position-relative">
          <Form layout="vertical">
            <Form.Item
              label={label}
              name={label}
              rules={[{ message: meta.error }]}
            >
              <Field
                as={Input.Password}
                name={name}
                label={label}
                disabled={disabled}
                onChange={onChange ? onChange : field.onChange}
                placeholder={placeholder}
                status={meta.error && meta.touched && "error"}
                prefix={<LockOutlined className="site-form-item-icon" />}
                iconRender={(visible: boolean) =>
                  visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />
                }
              />

              {meta.error && meta.touched && (
                <span className="error-message"> {meta.error} </span>
              )}
            </Form.Item>
          </Form>
        </div>
      </div>
    </>
  );
};
