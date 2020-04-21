import React from "react";
import { ReactComponent as Bakery } from "./assets/bakery.svg";
import { ReactComponent as Beverage } from "./assets/beverage.svg";
import { ReactComponent as Dairy } from "./assets/dairy.svg";
import { ReactComponent as Dry } from "./assets/dry.svg";
import { ReactComponent as Frozen } from "./assets/frozen.svg";
import { ReactComponent as Household } from "./assets/household.svg";
import { ReactComponent as Meat } from "./assets/meat.svg";
import { ReactComponent as Personal } from "./assets/personal.svg";
import { ReactComponent as Pharmacy } from "./assets/pharmacy.svg";
import { ReactComponent as Prepared } from "./assets/prepared.svg";
import { ReactComponent as Produce } from "./assets/produce.svg";
import { ReactComponent as Seafood } from "./assets/seafood.svg";

require("./style.scss");

export enum catIconType {
  bakery = "bakery",
  beverage = "beverage",
  dairy = "dairy",
  dry = "dry",
  frozen = "frozen",
  household = "household",
  meat = "meat",
  personal = "personal",
  pharmacy = "pharmacy",
  prepared = "prepared",
  produce = "produce",
  seafood = "seafood",
}

const svgIcons = {
  bakery: Bakery,
  beverage: Beverage,
  dairy: Dairy,
  dry: Dry,
  frozen: Frozen,
  household: Household,
  meat: Meat,
  personal: Personal,
  pharmacy: Pharmacy,
  prepared: Prepared,
  produce: Produce,
  seafood: Seafood,
};

interface OwnProps {
  iconType: catIconType; // iconType
  className?: string; // passthrough for className
}

type Props = OwnProps;

const Icon: React.FC<Props> = (props: Props): JSX.Element => {
  const { iconType, className } = props;

  const SVG = svgIcons[iconType];

  return (
    <div className={`category-icon ${className ? className : ""} `}>
      <SVG />
    </div>
  );
};

export default Icon;
