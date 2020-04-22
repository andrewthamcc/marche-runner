import React, { useState, RefObject } from "react";
import isEmail from "../../utils/isEmail";

require("./style.scss");

export enum textInputType {
  text = "text",
  email = "email",
  password = "password",
}

interface OwnProps {
  className?: string; // passthrough for className
  label?: string; // label name
  inputID?: string; // id for input required if labels are being used
  inputName: string; // name for label
  placeholder?: string; // placeholder text
  type?: textInputType;
  required?: boolean;
  value: string;
  onChange: (e) => void;
  ref?: RefObject<HTMLInputElement> | null; // forwardRef
  onBlur?: () => void; // passthrough of callback for onBlur event
  disabled?: boolean; // prop to disable input
}

type Props = OwnProps;

// todo: investigate proper typing of forwardRef
const TextInput: React.FC<Props> = React.forwardRef(
  (props: Props, ref?): JSX.Element => {
    const [errors, setErrors] = useState<string>("");
    const {
      className,
      label,
      inputName,
      inputID,
      placeholder,
      type,
      required,
      value,
      onChange,
      onBlur,
      disabled,
    } = props;

    const validateInput = (e) => {
      // onBlur callback
      if (onBlur) {
        onBlur();
      }

      if (required && value === "") {
        setErrors("This is required");
      }

      if (type === textInputType.email && !isEmail(value)) {
        setErrors("Invalid Email");
      }

      if (required && type === textInputType.password && value.length < 6) {
        setErrors("Minimum 6 characters");
      }
    };

    return (
      <div className={`text-input ${className ? className : ""}`}>
        {label && <label htmlFor={inputID}>{label}</label>}
        <input
          className={`${errors ? "error" : ""}`}
          type={type}
          name={inputName}
          id={inputID}
          placeholder={placeholder}
          value={value}
          onChange={onChange}
          onBlur={validateInput}
          onFocus={() => setErrors("")}
          ref={ref}
          disabled={disabled}
        />
        <p className="text-input-errors">{errors}</p>
      </div>
    );
  }
);

TextInput.defaultProps = {
  type: textInputType.text,
};

export default TextInput;
