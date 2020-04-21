import React from "react";
import CategoryIcon, { catIconType } from "../Category-Icon";

const categoryList = [
  {
    text: "Select Category",
    value: null,
    disabled: true,
  },
  {
    icon: <CategoryIcon iconType={catIconType.bakery} />,
    text: "Bakery",
    value: "bakery",
  },
  {
    icon: <CategoryIcon iconType={catIconType.beverage} />,
    text: "Beverage",
    value: "beverage",
  },
  {
    icon: <CategoryIcon iconType={catIconType.dairy} />,
    text: "Dairy & Cheese",
    value: "dairy",
  },
  {
    icon: <CategoryIcon iconType={catIconType.dry} />,
    text: "Dry & Canned Goods",
    value: "dry",
  },
  {
    icon: <CategoryIcon iconType={catIconType.frozen} />,
    text: "Frozen Foods",
    value: "frozen",
  },
  {
    icon: <CategoryIcon iconType={catIconType.household} />,
    text: "Household Items",
    value: "house",
  },
  {
    icon: <CategoryIcon iconType={catIconType.meat} />,
    text: "Meat",
    value: "meat",
  },
  {
    icon: <CategoryIcon iconType={catIconType.prepared} />,
    text: "Deli & Prepared Foods",
    value: "prepared",
  },
  {
    icon: <CategoryIcon iconType={catIconType.personal} />,
    text: "Personal Items",
    value: "personal",
  },
  {
    icon: <CategoryIcon iconType={catIconType.pharmacy} />,
    text: "Pharmacy",
    value: "pharmacy",
  },
  {
    icon: <CategoryIcon iconType={catIconType.produce} />,
    text: "Fruits & Vegetables",
    value: "produce",
  },
  {
    icon: <CategoryIcon iconType={catIconType.seafood} />,
    text: "Seafood",
    value: "seafood",
  },
];

export default categoryList;
