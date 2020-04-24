import React from "react";
import ReactDOM from "react-dom";
import DropDownListItem from "../dropdown-item";

import { DropdownItem } from "../index";

require("./style.scss");

interface Coords {
  width?: number;
  x: number;
  y: number;
}

interface Props {
  coords: Coords; // passthrough of coordinates to render list
  list: DropdownItem[]; // passthrough of list items
  listWidth?: number; // passthrough of optional prop for width of rendered list
  selectValue: (value) => void; // passthrough of function for selecting value
}

const DropdownList: React.FC<Props> = (props: Props) => {
  // props
  const { coords, list, listWidth, selectValue } = props;

  const style = {
    width: listWidth ? listWidth : coords.width,
    top: coords.y,
    left: coords.x,
  };

  const renderDropdownList = (
    <ul className="dropdown-list" style={style}>
      {list.map((item, index) => (
        <DropDownListItem item={item} key={index} selectValue={selectValue} />
      ))}
    </ul>
  );

  const portalRoot = document.querySelector("#portal-root");

  // render dropdown through portalRoot
  return ReactDOM.createPortal(renderDropdownList, portalRoot);
};

export default DropdownList;
