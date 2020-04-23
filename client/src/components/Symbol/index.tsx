import React from "react";
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
  addGreen: AddGreen,
  addOrange: AddOrange,
  checkmark: Checkmark,
  close: Close,
  error: ErrorSymbol,
  selected: Selected,
  unselected: Unselected,
  warning: Warning,
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
