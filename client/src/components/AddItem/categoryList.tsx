import React from "react";
import CategoryIcon, { iconType } from "../../components/Category-Icon";

const categoryList = [
  {
    text: "Select Category",
    value: null,
    disabled: true,
  },
  {
    icon: <CategoryIcon iconType={iconType.bakery} />,
    text: "Bakery",
    value: "bakery",
  },
  {
    icon: <CategoryIcon iconType={iconType.beverage} />,
    text: "Beverage",
    value: "beverage",
  },
  {
    icon: <CategoryIcon iconType={iconType.dairy} />,
    text: "Dairy & Cheese",
    value: "dairy",
  },
  {
    icon: <CategoryIcon iconType={iconType.dry} />,
    text: "Dry & Canned Goods",
    value: "dry",
  },
  {
    icon: <CategoryIcon iconType={iconType.frozen} />,
    text: "Frozen Foods",
    value: "frozen",
  },
  {
    icon: <CategoryIcon iconType={iconType.household} />,
    text: "Household Items",
    value: "house",
  },
  {
    icon: <CategoryIcon iconType={iconType.meat} />,
    text: "Meat",
    value: "meat",
  },
  {
    icon: <CategoryIcon iconType={iconType.prepared} />,
    text: "Deli & Prepared Foods",
    value: "prepared",
  },
  {
    icon: <CategoryIcon iconType={iconType.personal} />,
    text: "Personal Items",
    value: "personal",
  },
  {
    icon: <CategoryIcon iconType={iconType.pharmacy} />,
    text: "Pharmacy",
    value: "pharmacy",
  },
  {
    icon: <CategoryIcon iconType={iconType.produce} />,
    text: "Fruits & Vegetables",
    value: "produce",
  },
  {
    icon: <CategoryIcon iconType={iconType.seafood} />,
    text: "Seafood",
    value: "seafood",
  },
];

export default categoryList;
