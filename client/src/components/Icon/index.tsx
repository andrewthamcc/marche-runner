import React from "react";
import { ReactComponent as CaretDown } from "./assets/caretDown.svg";
import { ReactComponent as ChevronDown } from "./assets/chevron.svg";
import { ReactComponent as Close } from "./assets/close.svg";
import { ReactComponent as Gear } from "./assets/gear.svg";
import { ReactComponent as Info } from "./assets/info.svg";
import { ReactComponent as Logout } from "./assets/logout.svg";
import { ReactComponent as Pencil } from "./assets/pencil.svg";
import { ReactComponent as Profile } from "./assets/profile.svg";
import { ReactComponent as Search } from "./assets/search.svg";
import { ReactComponent as Trash } from "./assets/trash.svg";

require("./style.scss");

export enum iconType {
  caretDown = "caretDown",
  chevronDown = "chevronDown",
  close = "close",
  gear = "gear",
  info = "info",
  logout = "logout",
  pencil = "pencil",
  profile = "profile",
  search = "search",
  trash = "trash",
}

export enum iconColor {
  green = "green",
  orange = "orange",
  grey = "grey",
}

const svgIcons = {
  caretDown: CaretDown,
  chevronDown: ChevronDown,
  close: Close,
  gear: Gear,
  info: Info,
  logout: Logout,
  pencil: Pencil,
  profile: Profile,
  search: Search,
  trash: Trash,
};

interface OwnProps {
  className?: string; // passthrough for className
  color?: iconColor; // color of icon
  iconType: iconType; // iconType
}

type Props = OwnProps;

const Icon: React.FC<Props> = (props: Props): JSX.Element => {
  // props
  const { className, color, iconType } = props;

  const SVG = svgIcons[iconType];

  return (
    <div className={`icon ${className ? className : ""} ${color ? color : ""}`}>
      <SVG />
    </div>
  );
};

export default Icon;
