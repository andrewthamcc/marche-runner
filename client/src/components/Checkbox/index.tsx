import React from "react";

import Symbol, { symbolType } from "../Symbol";

require("./style.scss");

interface Props {
  checked: boolean; // boolean for marking checked
  className?: string;
  inputID: string; // id for input required if labels are being used
  inputName: string;
  label?: string;
  onChange: () => void; // change handler
}

const Checkbox: React.FC<Props> = (props: Props): JSX.Element => {
  // props
  const { checked, className, inputID, inputName, label, onChange } = props;

  return (
    <div className={`checkbox ${className ? className : ""}`}>
      <input
        checked={checked}
        id={inputID}
        name={inputName}
        onChange={onChange}
        type="checkbox"
      />
      <span className="checkbox-icon" onClick={onChange}>
        <Symbol
          symbolType={checked ? symbolType.checkmark : symbolType.unselected}
        />
      </span>
      <label htmlFor={inputID} className={`${checked ? "checked" : ""}`}>
        {label}
      </label>
    </div>
  );
};

export default Checkbox;
