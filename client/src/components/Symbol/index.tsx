import React from "react";
import { ReactComponent as AddGreen } from "./assets/addGreen.svg";
import { ReactComponent as AddOrange } from "./assets/addOrange.svg";
import { ReactComponent as Checkmark } from "./assets/checkmark.svg";
import { ReactComponent as Close } from "./assets/close.svg";
import { ReactComponent as Selected } from "./assets/selected.svg";
import { ReactComponent as Unselected } from "./assets/unselected.svg";

require("./style.scss");

export enum symbolType {
  addGreen = "addGreen",
  addOrange = "addOrange",
  checkmark = "checkmark",
  close = "close",
  selected = "selected",
  unselected = "unselected",
}

const svgSymbols = {
  addGreen: AddGreen,
  addOrange: AddOrange,
  checkmark: Checkmark,
  close: Close,
  selected: Selected,
  unselected: Unselected,
};

interface OwnProps {
  symbolType: symbolType; // iconType
  className?: string; // passthrough for className
}

type Props = OwnProps;

const Icon: React.FC<Props> = (props: Props): JSX.Element => {
  const { symbolType, className } = props;

  const SVG = svgSymbols[symbolType];

  return (
    <div className={`symbol ${className ? className : ""}`}>
      <SVG />
    </div>
  );
};

export default Icon;
