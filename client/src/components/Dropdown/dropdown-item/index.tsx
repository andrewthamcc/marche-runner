import React from "react";
import { DropDownItem } from "../index";

require("./style.scss");

interface Props {
  item: DropDownItem;
  selectValue: (item) => void;
}

const dropdownListItem: React.FC<Props> = (props: Props) => {
  const { item, selectValue } = props;

  // remove disabled item from selectable items
  if (item.disabled) {
    return null;
  }

  return (
    <li
      className="dropdown-list-item"
      onClick={() => selectValue(item)}
      tabIndex={0}
    >
      <span className="dropdown-list-item-icon">{item.icon}</span>
      <span className="dropdown-list-item-text">{item.text}</span>
    </li>
  );
};

export default dropdownListItem;
