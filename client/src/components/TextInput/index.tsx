import React, { useState, RefObject } from "react";
import isEmail from "../../utils/isEmail";

require("./style.scss");

export enum textInputType {
  email = "email",
  text = "text",
  password = "password",
}

interface Props {
  className?: string; // passthrough for className
  disabled?: boolean; // prop to disable input
  inputID?: string; // id for input required if labels are being used
  inputName: string; // name for label
  label?: string; // label name
  onBlur?: () => void; // passthrough of callback for onBlur event
  onChange: (e) => void;
  onFocus?: (e) => void;
  placeholder?: string; // placeholder text
  ref?: RefObject<HTMLInputElement> | null; // forwardRef
  required?: boolean;
  tabIndex?: number; // passthrough for tab index
  type?: textInputType; // type of input text | email | password
  value: string;
}

// todo: investigate proper typing of forwardRef
const TextInput: React.FC<Props> = React.forwardRef(
  (props: Props, ref?): JSX.Element => {
    // state
    const [errors, setErrors] = useState<string>("");

    // props
    const {
      className,
      disabled,
      inputID,
      inputName,
      label,
      onBlur,
      onChange,
      onFocus,
      placeholder,
      required,
      tabIndex,
      type,
      value,
    } = props;

    const handleFocus = (e) => {
      if (onFocus) {
        onFocus(e);
      }

      setErrors("");
    };

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
          disabled={disabled}
          id={inputID}
          name={inputName}
          onBlur={validateInput}
          onChange={onChange}
          onFocus={(e) => handleFocus(e)}
          placeholder={placeholder}
          ref={ref}
          tabIndex={tabIndex}
          type={type}
          value={value}
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
