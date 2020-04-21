import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { Item } from "../../models/item";

// components
import CategoryList, { categoryType } from "../../components/Category-List";
import CategoryItem from "../../components/Category-List/Category-List-Item";
import TextInput from "../../components/TextInput";
import Dropdown, { DropDownItem } from "../../components/Dropdown";
import categoryList from "./categoryDropdownData";
import CategoryIcon, { catIconType } from "../../components/Category-Icon";
import Symbol, { symbolType } from "../../components/Symbol";
import LoadingSpinner from "../../components/Loader";

// react actions
import { getItems, searchItems, clearSearch } from "../../actions/items";

require("./style.scss");

interface OwnProps {}

interface ReduxStateProps {
  items: Item[];
  searchResults: Item[];
  loading: boolean;
}

interface ReduxDispatchProps {
  getItems: () => void;
  searchItems: (item) => void;
  clearSearch: () => void;
}

type Props = OwnProps & ReduxStateProps & ReduxDispatchProps;

const Dashboard: React.FC<Props> = (props: Props): JSX.Element => {
  const [selectListView, setSelectListView] = useState<DropDownItem>(
    categoryList[0]
  );
  const [searchText, setSearchText] = useState<string>("");
  const {
    getItems,
    searchItems,
    clearSearch,
    items,
    searchResults,
    loading,
  } = props;

  useEffect(() => {
    // fetch items when items are empty
    if (items.length === 0) {
      getItems();
    }

    if (searchText === "" && items.length > 0) {
      clearSearch();
    } else if (searchText !== "") {
      searchItems(searchText);
    }

    // eslint-disable-next-line
  }, [searchText]);

  const handleSearch = (e) => {
    setSearchText(e.target.value);
  };

  const clearInput = () => {
    setSearchText("");
    clearSearch();
  };

  const handleChange = (category) => {
    setSelectListView(category);
  };

  const renderControls = () => {
    return (
      <>
        <div className="dashboard-controls-input">
          {selectListView.value === "all" && (
            <TextInput
              label="Search List:"
              inputName="search-item-input"
              value={searchText}
              onChange={(e) => handleSearch(e)}
              placeholder="Search"
              className="dashboard-controls-input-field"
            />
          )}
          {searchText !== "" && (
            <span
              className="dashboard-controls-input-clear"
              onClick={() => clearInput()}
            >
              <Symbol symbolType={symbolType.close} />{" "}
            </span>
          )}
        </div>
        {searchText === "" && (
          <Dropdown
            label="List View:"
            list={categoryList}
            value={selectListView}
            selectValue={handleChange}
            width={245}
            className="dashboard-controls-dropdown"
          />
        )}
      </>
    );
  };

  const renderList = () => {
    // get array of ids from search results
    const searchIDS = [];
    searchResults.forEach((result) => searchIDS.push(result._id));

    // filter only the items to display
    const itemsToDisplay = items.filter((item) => searchIDS.includes(item._id));

    if (searchResults.length > 0) {
      return (
        <div className="dashboard-single-list">
          <div className="category-list">
            <div className="category-list-header">
              <CategoryIcon iconType={catIconType.allItems} />
              <h3>Search Results</h3>
            </div>
            <hr />
            {itemsToDisplay.map((item) => (
              <CategoryItem item={item} key={item._id} />
            ))}
          </div>
        </div>
      );
    }

    if (selectListView.value === "all") {
      return (
        <div className="dashboard-grid">
          {categoryList.map((category) => {
            if (category.value !== "all") {
              return (
                <CategoryList
                  category={category.value}
                  items={items}
                  key={category.text}
                />
              );
            }
          })}
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
        <div className="dashboard-controls">{renderControls()}</div>

        {renderList()}
      </div>
    </div>
  );
};

const mapStateToProps = (state) => ({
  items: state.itemState.items,
  searchResults: state.itemState.searchResults,
  loading: state.itemState.loading,
});

export default connect(mapStateToProps, { getItems, searchItems, clearSearch })(
  Dashboard
);
