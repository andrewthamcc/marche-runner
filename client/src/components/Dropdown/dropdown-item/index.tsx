import React from "react";
import { DropdownItem } from "../index";

require("./style.scss");

interface Props {
  item: DropdownItem;
  selectValue: (item) => void;
}

const dropdownListItem: React.FC<Props> = (props: Props) => {
  // props
  const { item, selectValue } = props;

  // remove disabled item from selectable items
  if (item.disabled) {
    return null;
  }

  const handleClick = () => {
    selectValue(item);

    if (item.fn) {
      item.fn();
    }
  };

  return (
    <li className="dropdown-list-item" onClick={handleClick} tabIndex={0}>
      <span className="dropdown-list-item-icon">{item.icon}</span>
      <span className="dropdown-list-item-text">{item.text}</span>
    </li>
  );
};

export default dropdownListItem;
