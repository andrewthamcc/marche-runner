import React from "react";
import { ReactComponent as ChevronDown } from "./assets/chevron.svg";
import { ReactComponent as Info } from "./assets/info.svg";
import { ReactComponent as Pencil } from "./assets/pencil.svg";
import { ReactComponent as Profile } from "./assets/profile.svg";
import { ReactComponent as Search } from "./assets/search.svg";
import { ReactComponent as Trash } from "./assets/trash.svg";

require("./style.scss");

export enum iconType {
  chevronDown = "chevronDown",
  info = "info",
  pencil = "pencil",
  profile = "profile",
  search = "search",
  trash = "trash",
}

export enum iconColor {
  green = "green",
  orange = "orange",
  purple = "purple",
}

const svgIcons = {
  chevronDown: ChevronDown,
  info: Info,
  pencil: Pencil,
  profile: Profile,
  search: Search,
  trash: Trash,
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
