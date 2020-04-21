import React, { useEffect } from "react";
import { connect } from "react-redux";
import { Item } from "../../models/item";

// components
import AddItem from "../../components/AddItem";
import CategoryList, { categoryType } from "../../components/Category-List";

// react actions
import { getItems } from "../../actions/items";

require("./style.scss");

interface OwnProps {}

interface ReduxStateProps {
  items: Item[];
}

interface ReduxDispatchProps {
  getItems: () => void;
}

type Props = OwnProps & ReduxStateProps & ReduxDispatchProps;

const Dashboard: React.FC<Props> = (props: Props): JSX.Element => {
  const { getItems, items } = props;

  useEffect(() => {
    // fetch items
    getItems();

    // eslint-disable-next-line
  }, []);

  return (
    <div className="dashboard">
      <div className="container">
        {/* <AddItem /> */}

        <div className="dashboard-grid">
          <CategoryList category={categoryType.bakery} items={items} />
          <CategoryList category={categoryType.beverage} items={items} />
          <CategoryList category={categoryType.dairy} items={items} />
          <CategoryList category={categoryType.dry} items={items} />
          <CategoryList category={categoryType.frozen} items={items} />
          <CategoryList category={categoryType.household} items={items} />
          <CategoryList category={categoryType.meat} items={items} />
          <CategoryList category={categoryType.personal} items={items} />
          <CategoryList category={categoryType.pharmacy} items={items} />
          <CategoryList category={categoryType.prepared} items={items} />
          <CategoryList category={categoryType.produce} items={items} />
          <CategoryList category={categoryType.seafood} items={items} />
        </div>
      </div>
    </div>
  );
};

const mapStateToProps = (state) => ({
  items: state.itemState.items,
});

export default connect(mapStateToProps, { getItems })(Dashboard);
