import React from "react";
import { ReactComponent as AddDisable } from "./assets/addDisable.svg";
import { ReactComponent as AddGreen } from "./assets/addGreen.svg";
import { ReactComponent as AddOrange } from "./assets/addOrange.svg";
import { ReactComponent as Checkmark } from "./assets/checkmark.svg";
import { ReactComponent as Close } from "./assets/close.svg";
import { ReactComponent as ErrorSymbol } from "./assets/error.svg";
import { ReactComponent as Selected } from "./assets/selected.svg";
import { ReactComponent as Unselected } from "./assets/unselected.svg";
import { ReactComponent as Warning } from "./assets/warning.svg";

require("./style.scss");

export enum symbolType {
  addDisable = "addDisable",
  addGreen = "addGreen",
  addOrange = "addOrange",
  checkmark = "checkmark",
  close = "close",
  error = "error",
  selected = "selected",
  unselected = "unselected",
  warning = "warning",
}

const svgSymbols = {
  addDisable: AddDisable,
  addGreen: AddGreen,
  addOrange: AddOrange,
  checkmark: Checkmark,
  close: Close,
  error: ErrorSymbol,
  selected: Selected,
  unselected: Unselected,
  warning: Warning,
};

interface Props {
  className?: string; // passthrough for className
  symbolType: symbolType; // iconType
}

const Icon: React.FC<Props> = (props: Props): JSX.Element => {
  // props
  const { className, symbolType } = props;

  const SVG = svgSymbols[symbolType];

  return (
    <div className={`symbol ${className ? className : ""}`}>
      <SVG />
    </div>
  );
};

export default Icon;
