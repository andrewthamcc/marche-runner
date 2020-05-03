import React from "react";
import { ReactComponent as AllItems } from "./assets/allItems.svg";
import { ReactComponent as Bakery } from "./assets/bakery.svg";
import { ReactComponent as Beverage } from "./assets/beverage.svg";
import { ReactComponent as Dairy } from "./assets/dairy.svg";
import { ReactComponent as Dry } from "./assets/dry.svg";
import { ReactComponent as Frozen } from "./assets/frozen.svg";
import { ReactComponent as Household } from "./assets/household.svg";
import { ReactComponent as List } from "./assets/list.svg";
import { ReactComponent as Meat } from "./assets/meat.svg";
import { ReactComponent as Personal } from "./assets/personal.svg";
import { ReactComponent as Pharmacy } from "./assets/pharmacy.svg";
import { ReactComponent as Prepared } from "./assets/prepared.svg";
import { ReactComponent as Produce } from "./assets/produce.svg";
import { ReactComponent as Seafood } from "./assets/seafood.svg";
import { ReactComponent as Snack } from "./assets/snack.svg";

require("./style.scss");

export enum catIconType {
  allItems = "allItems",
  bakery = "bakery",
  beverage = "beverage",
  dairy = "dairy",
  dry = "dry",
  frozen = "frozen",
  household = "household",
  list = "list",
  meat = "meat",
  personal = "personal",
  pharmacy = "pharmacy",
  prepared = "prepared",
  produce = "produce",
  seafood = "seafood",
  snack = "snack",
}

const svgIcons = {
  allItems: AllItems,
  bakery: Bakery,
  beverage: Beverage,
  dairy: Dairy,
  dry: Dry,
  frozen: Frozen,
  household: Household,
  list: List,
  meat: Meat,
  personal: Personal,
  pharmacy: Pharmacy,
  prepared: Prepared,
  produce: Produce,
  seafood: Seafood,
  snack: Snack,
};

interface Props {
  className?: string; // passthrough for className
  iconType: catIconType; // iconType
}

const Icon: React.FC<Props> = (props: Props): JSX.Element => {
  const { className, iconType } = props;

  const SVG = svgIcons[iconType];

  return (
    <div className={`category-icon ${className ? className : ""} `}>
      <SVG />
    </div>
  );
};

export default Icon;
