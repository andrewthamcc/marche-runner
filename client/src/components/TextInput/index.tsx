import React, { useState } from "react";

require("./style.scss");

export enum textInputType {
  text = "text",
  password = "password",
}

interface OwnProps {
  className?: string; // passthrough for className
  label?: string; // label name
  inputName: string; // name for label
  placeholder?: string; // placeholder text
  type?: textInputType;
  required?: boolean;
  value: string;
  onChange: (e) => void;
}

type Props = OwnProps;

const TextInput: React.FC<Props> = (props: Props): JSX.Element => {
  const [errors, setErrors] = useState<string>("");
  const {
    className,
    label,
    inputName,
    placeholder,
    type,
    required,
    value,
    onChange,
  } = props;

  const validateInput = (e) => {
    if (required && value === "") {
      setErrors("This is required");
    }
  };

  return (
    <div className={`text-input ${className ? className : ""}`}>
      <label htmlFor={inputName}>{label}</label>
      <input
        className={`${errors ? "error" : ""}`}
        type={type}
        name={inputName}
        id={inputName}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        onBlur={validateInput}
        onFocus={() => setErrors("")}
      />
      <p className="text-input-errors">{errors}</p>
    </div>
  );
};

TextInput.defaultProps = {
  type: textInputType.text,
};

export default TextInput;
