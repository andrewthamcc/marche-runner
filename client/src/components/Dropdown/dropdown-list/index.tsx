import React from "react";
import ReactDOM from "react-dom";
import DropDownListItem from "../dropdown-item";

import { DropDownItem } from "../index";

require("./style.scss");

interface Coords {
  x: number;
  y: number;
  width?: number;
}

interface Props {
  coords: Coords; // passthrough of coordinates to render list
  list: DropDownItem[]; // passthrough of list items
  listWidth?: number; // passthrough of optional prop for width of rendered list
  selectValue: (value) => void; // passthrough of function for selecting value
}

const DropdownList: React.FC<Props> = (props: Props) => {
  const { coords, list, listWidth, selectValue } = props;

  const style = {
    top: coords.y,
    left: coords.x,
    width: listWidth ? listWidth : coords.width,
  };

  const portalRoot = document.querySelector("#portal-root");

  const renderDropdownList = (
    <ul className="dropdown-list" style={style}>
      {list.map((item, index) => (
        <DropDownListItem item={item} key={index} selectValue={selectValue} />
      ))}
    </ul>
  );

  // render dropdown through portalRoot
  return ReactDOM.createPortal(renderDropdownList, portalRoot);
};

export default DropdownList;
