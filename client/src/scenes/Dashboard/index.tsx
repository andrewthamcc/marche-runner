import React, { useState } from "react";
import { connect } from "react-redux";

// components
import AddItem from "../../components/AddItem";
import CategoryList, { categoryType } from "../../components/Category-List";

require("./style.scss");

interface OwnProps {}

interface ReduxStateProps {}

interface ReduxDispatchProps {}

type Props = OwnProps & ReduxStateProps & ReduxDispatchProps;

const Dashboard: React.FC<Props> = (props: Props): JSX.Element => {
  return (
    <div className="dashboard">
      <div className="container">
        <AddItem />

        <div className="dashboard-grid">
          <CategoryList category={categoryType.bakery} />
          <CategoryList category={categoryType.beverage} />
          <CategoryList category={categoryType.dairy} />
          <CategoryList category={categoryType.dry} />
          <CategoryList category={categoryType.frozen} />
          <CategoryList category={categoryType.household} />
          <CategoryList category={categoryType.meat} />
          <CategoryList category={categoryType.personal} />
          <CategoryList category={categoryType.pharmacy} />
          <CategoryList category={categoryType.prepared} />
          <CategoryList category={categoryType.produce} />
          <CategoryList category={categoryType.seafood} />
        </div>
      </div>
    </div>
  );
};

const mapStateToProps = (state) => ({});

export default connect(mapStateToProps, {})(Dashboard);
