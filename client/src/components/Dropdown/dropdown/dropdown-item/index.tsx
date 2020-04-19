import React from "react";
import PropTypes from "prop-types";

require("./style.scss");

import { DropDownItem } from "../../dropdown";

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
      {item.text}
    </li>
  );
};

export default dropdownListItem;
