import React from "react";

import Symbol, { symbolType } from "../Symbol";

require("./style.scss");

interface Props {
  className?: string;
  inputID: string; // id for input required if labels are being used
  inputName: string;
  label?: string;
  checked: boolean; // boolean for marking checked
  onChange: () => void; // change handler
}

const Checkbox: React.FC<Props> = (props: Props): JSX.Element => {
  const { className, label, inputID, inputName, checked, onChange } = props;

  return (
    <div className={`checkbox ${className ? className : ""}`}>
      <input
        type="checkbox"
        name={inputName}
        id={inputID}
        checked={checked}
        onChange={onChange}
      />
      <span className="checkbox-icon" onClick={onChange}>
        <Symbol
          symbolType={checked ? symbolType.selected : symbolType.unselected}
        />
      </span>
      <label htmlFor={inputID} className={`${checked ? "checked" : ""}`}>
        {label}
      </label>
    </div>
  );
};

export default Checkbox;
