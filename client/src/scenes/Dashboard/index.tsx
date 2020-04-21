import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { Item } from "../../models/item";

// components
import CategoryList, { categoryType } from "../../components/Category-List";
import LoadingSpinner from "../../components/Loader";
import Dropdown from "../../components/Dropdown";
import categoryList from "./categoryDropdownData";

// react actions
import { getItems } from "../../actions/items";

require("./style.scss");

interface OwnProps {}

interface ReduxStateProps {
  items: Item[];
  loading: boolean;
}

interface ReduxDispatchProps {
  getItems: () => void;
}

type Props = OwnProps & ReduxStateProps & ReduxDispatchProps;

const Dashboard: React.FC<Props> = (props: Props): JSX.Element => {
  const [selectListView, setSelectListView] = useState(categoryList[0]);
  const { getItems, items, loading } = props;

  useEffect(() => {
    // fetch items
    getItems();

    // eslint-disable-next-line
  }, []);

  const handleChange = (category) => {
    setSelectListView(category);
  };

  const renderList = () => {
    if (selectListView.value === "all") {
      return (
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
      );
    }

    return (
      <div className="dashboard-single-list">
        <CategoryList category={selectListView.value} items={items} />
      </div>
    );
  };

  if (loading) {
    return (
      <div className="dashboard">
        <LoadingSpinner />
      </div>
    );
  }

  return (
    <div className="dashboard">
      <div className="container">
        <div className="dashboard-dropdown">
          <Dropdown
            label="List View:"
            list={categoryList}
            value={selectListView}
            selectValue={handleChange}
            width={245}
            className="add-item-dropdown"
          />
        </div>

        {renderList()}
      </div>
    </div>
  );
};

const mapStateToProps = (state) => ({
  items: state.itemState.items,
  loading: state.itemState.loading,
});

export default connect(mapStateToProps, { getItems })(Dashboard);
