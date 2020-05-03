import React from "react";

import Symbol, { symbolType } from "../Symbol";

require("./style.scss");

interface Props {
  checked: boolean;
  className?: string; // passthrough for className
  inputID?: string; // id for input required if labels are being used
  inputName: string; // name for label
  label?: string; // label name
  onChange: () => void; // change handler
}

const RadioInput: React.FC<Props> = (props: Props): JSX.Element => {
  // props
  const { checked, className, inputID, inputName, label, onChange } = props;

  return (
    <div className={`radio-input ${className ? className : ""}`}>
      <input
        checked={checked}
        id={inputID}
        name={inputName}
        onChange={onChange}
        type="radio"
      />
      <span className="radio-input-icon" onClick={onChange}>
        <Symbol
          symbolType={checked ? symbolType.selected : symbolType.unselected}
        />
      </span>
      <label htmlFor={inputID}>{label}</label>
    </div>
  );
};

export default RadioInput;
