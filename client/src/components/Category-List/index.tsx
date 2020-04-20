import React from "react";
import { connect } from "react-redux";

// react components
import CategoryIcon, { iconType } from "../Category-Icon";

require("./style.scss");

export enum categoryType {
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

const categoryInfo = {
  bakery: { title: "Bakery", icon: iconType.bakery },
  beverage: { title: "Beverages", icon: iconType.beverage },
  dairy: { title: "Dairy & Cheese", icon: iconType.dairy },
  dry: { title: "Dry & Canned Goods", icon: iconType.dry },
  frozen: { title: "Frozen Foods", icon: iconType.frozen },
  household: { title: "Household Items", icon: iconType.household },
  meat: { title: "Meat", icon: iconType.meat },
  personal: { title: "Personal Items", icon: iconType.personal },
  pharmacy: { title: "Pharmacy", icon: iconType.pharmacy },
  prepared: { title: "Deli & Prepared Foods", icon: iconType.prepared },
  produce: { title: "Fruits & Vegetables", icon: iconType.produce },
  seafood: { title: "Seafood", icon: iconType.seafood },
};

interface OwnProps {
  category: categoryType;
}

interface ReduxStateProps {}

interface ReduxDispatchProps {}

type Props = OwnProps & ReduxStateProps & ReduxDispatchProps;

const CategoryList: React.FC<Props> = (props: Props): JSX.Element => {
  const { category } = props;

  return (
    <div className="category-list">
      <div className="category-list-header">
        <CategoryIcon
          iconType={categoryInfo[category].icon}
          className="category-list-icon"
        />
        <h3 className="category-list-title">{categoryInfo[category].title}</h3>
      </div>
      <hr />
    </div>
  );
};

const mapStateToProps = (state) => ({});

export default connect(mapStateToProps, {})(CategoryList);
