import React from "react";

import Icon, { iconType } from "../Icon";

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
      <label htmlFor={inputID} className="visuallyHidden">
        {label}
      </label>
      <input
        type="checkbox"
        name={inputName}
        id={inputID}
        checked={checked}
        onChange={onChange}
      />
      <span className="checkbox-icon" onClick={onChange}>
        <Icon iconType={checked ? iconType.selected : iconType.unselected} />
      </span>
    </div>
  );
};

export default Checkbox;
