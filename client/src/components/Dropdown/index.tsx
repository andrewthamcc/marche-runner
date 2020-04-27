import React, { useState, useRef } from "react";
import DropdownList from "./dropdown-list";
import useOutsideClick from "../../utils/outsideClick";
import Icon, { iconType } from "../Icon";
require("./style.scss");

// define model for dropdown here
export interface DropdownItem {
  disabled?: boolean;
  fn?: () => void;
  icon?: JSX.Element;
  text: string;
  value: any;
}

interface Props {
  caret?: boolean; // prop for caret only dropdown TODO: make it so this dropdown can only be an icon instead...
  className?: string; // passthrough for className
  disabled?: boolean; // prop to disable dropdown functionality
  label?: string; // label for dropdown
  list: DropdownItem[]; // array of dropdown items - TypeScript would help with creating a model for this data
  listWidth?: number; // optional prop for width of rendered dropdown list
  selectValue: (value) => void; // passthrough for method of changing the value similar usage to onChange
  value: any; // passthrough for setting value of dropdown
  width?: number; // width of dropdown menu
}

interface ICoords {
  x: number;
  y: number;
}

const Dropdown: React.FC<Props> = (props: Props) => {
  // state
  const [dropdownOpen, setDropdownOpen] = useState<boolean>(false); // boolean to toggle opening of dropdown
  const [coords, setCoords] = useState<ICoords>({ x: 0, y: 0 }); // coordinates to open dropdown list

  // props
  const {
    caret,
    className,
    disabled,
    label,
    list,
    listWidth,
    selectValue,
    value,
    width,
  } = props;

  // other hooks
  const dropdownRef = useRef(null); // ref of dropdown list for coordinates
  useOutsideClick(dropdownRef, () => setDropdownOpen(false));

  const toggleDropdown = () => {
    if (disabled) {
      return;
    }

    const rect = dropdownRef.current.getBoundingClientRect();
    const newCoords = {
      x: rect.right - rect.width / 2,
      y: rect.bottom + 10 + window.scrollY,
      width: rect.width,
    };

    if (caret) {
      newCoords.x = rect.right - rect.width * 2;
      newCoords.y = newCoords.y - 10;
    }

    setCoords(newCoords);
    setDropdownOpen(!dropdownOpen);
  };

  return (
    <div
      className={`dropdown-wrapper ${className ? className : ""}`}
      style={{ width }}
      onClick={toggleDropdown}
    >
      {label && <label className="dropdown-label">{label}</label>}

      <div
        className={`dropdown 
          ${dropdownOpen ? "open" : ""} 
          ${disabled ? "disabled" : ""}
        `}
        ref={dropdownRef}
        tabIndex={0}
      >
        {value.icon && <span className="dropdown-icon">{value.icon}</span>}
        <span className="dropdown-text">{value.text}</span>
        <span className="dropdown-caret">
          <Icon iconType={iconType.caretDown} />
        </span>

        {dropdownOpen && (
          <DropdownList
            list={list}
            coords={coords}
            selectValue={selectValue}
            listWidth={listWidth}
          />
        )}
      </div>
    </div>
  );
};

Dropdown.defaultProps = {
  width: 200,
};

export default Dropdown;
