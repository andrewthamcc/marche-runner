import React from "react";
import { ReactComponent as Add } from "./assets/add.svg";
import { ReactComponent as ChevronDown } from "./assets/chevron.svg";
import { ReactComponent as Close } from "./assets/close.svg";
import { ReactComponent as Info } from "./assets/info.svg";
import { ReactComponent as Pencil } from "./assets/pencil.svg";
import { ReactComponent as Profile } from "./assets/profile.svg";
import { ReactComponent as Search } from "./assets/search.svg";
import { ReactComponent as Selected } from "./assets/checkmark.svg";
import { ReactComponent as Trash } from "./assets/trash.svg";
import { ReactComponent as Unselected } from "./assets/unselected.svg";

require("./style.scss");

export enum iconType {
  add = "add",
  chevronDown = "chevronDown",
  close = "close",
  info = "info",
  pencil = "pencil",
  profile = "profile",
  search = "search",
  selected = "selected",
  trash = "trash",
  unselected = "unselected",
}

export enum iconColor {
  green = "green",
  orange = "orange",
}

const svgIcons = {
  add: Add,
  chevronDown: ChevronDown,
  close: Close,
  info: Info,
  pencil: Pencil,
  profile: Profile,
  search: Search,
  selected: Selected,
  trash: Trash,
  unselected: Unselected,
};

interface OwnProps {
  iconType: iconType; // iconType
  color?: iconColor; // color of icon
  className?: string; // passthrough for className
}

type Props = OwnProps;

const Icon: React.FC<Props> = (props: Props): JSX.Element => {
  const { iconType, color, className } = props;

  const SVG = svgIcons[iconType];

  return (
    <div className={`icon ${className ? className : ""} ${color ? color : ""}`}>
      <SVG />
    </div>
  );
};

export default Icon;
