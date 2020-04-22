import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { Item } from "../../models/item";

// components
import CategoryList from "../../components/Category-List";
import CategoryItem from "../../components/Category-List/Category-List-Item";
import TextInput from "../../components/TextInput";
import Dropdown, { DropdownItem } from "../../components/Dropdown";
import categoryList from "./categoryDropdownData";
import CategoryIcon, { catIconType } from "../../components/Category-Icon";
import Symbol, { symbolType } from "../../components/Symbol";
import ConfirmationModal from "../../components/ConfirmationModal";
import useModal from "../../components/ConfirmationModal/useModal";
import LoadingSpinner from "../../components/Loader";

// react actions
import {
  getItems,
  searchItems,
  clearSearch,
  deletePurchasedItems,
  deleteAllItems,
} from "../../actions/items";

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
  deletePurchasedItems: () => void;
  deleteAllItems: () => void;
}

type Props = OwnProps & ReduxStateProps & ReduxDispatchProps;

const Dashboard: React.FC<Props> = (props: Props): JSX.Element => {
  const deleteDropdownList = [
    {
      text: "Select...",
      value: null,
      disabled: true,
    },
    {
      text: "Purchased Items",
      value: "purchased",
      fn: () => openModal(),
    },
    {
      text: "All Items",
      value: "all",
      fn: () => openModal(),
    },
  ];

  const [selectListView, setSelectListView] = useState<DropdownItem>(
    categoryList[0]
  );
  const [deleteSelection, setDeleteSelection] = useState<DropdownItem>(
    deleteDropdownList[0]
  );
  const [searchText, setSearchText] = useState<string>("");
  const { open, openModal, closeModal } = useModal();
  const {
    getItems,
    searchItems,
    clearSearch,
    deletePurchasedItems,
    deleteAllItems,
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

    // revert the list the default when the modal closes
    if (open === false) {
      setDeleteSelection(deleteDropdownList[0]);
    }

    // eslint-disable-next-line
  }, [searchText, open]);

  const clearInput = () => {
    setSearchText("");
    clearSearch();
  };

  const handleDeleteConfirmation = () => {
    if (deleteSelection.value === "all") {
      deleteAllItems();
    } else if (deleteSelection.value === "purchased") {
      deletePurchasedItems();
    }

    closeModal();
  };

  // dashboard controls
  const renderControls = () => {
    return (
      <>
        <div className="dashboard-controls-input">
          {selectListView.value === "all" && (
            <TextInput
              label="Search List:"
              inputName="search-item-input"
              value={searchText}
              onChange={(e) => setSearchText(e.target.value)}
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
          <div className="dashboard-controls-right">
            <Dropdown
              label="List View:"
              list={categoryList}
              value={selectListView}
              selectValue={(selection) => setSelectListView(selection)}
              width={245}
              className="dashboard-controls-dropdown"
            />
            <Dropdown
              label="Delete Items:"
              list={deleteDropdownList}
              value={deleteSelection}
              selectValue={(selection) => setDeleteSelection(selection)}
              className="dashboard-controls-dropdown"
            />
          </div>
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

    // search view
    if (searchText !== "") {
      return (
        <div className="dashboard-single-list">
          <div className="category-list">
            <div className="category-list-header">
              <CategoryIcon iconType={catIconType.allItems} />
              <h3>Search Results</h3>
            </div>
            <hr />
            {itemsToDisplay.length > 0
              ? itemsToDisplay.map((item) => (
                  <CategoryItem item={item} key={item._id} />
                ))
              : "No results..."}
          </div>
        </div>
      );
    }

    // all-item view
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
            return null;
          })}
        </div>
      );
    }

    // single list view
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
    <>
      {open && (
        <ConfirmationModal
          isModalOpen={open}
          close={closeModal}
          title={`Delete ${deleteSelection.text}?`}
          confirm={() => handleDeleteConfirmation()}
        />
      )}

      <div className="dashboard">
        <div className="container">
          <div className="dashboard-controls">{renderControls()}</div>
          {renderList()}
        </div>
      </div>
    </>
  );
};

const mapStateToProps = (state) => ({
  items: state.itemState.items,
  searchResults: state.itemState.searchResults,
  loading: state.itemState.loading,
});

export default connect(mapStateToProps, {
  getItems,
  searchItems,
  clearSearch,
  deleteAllItems,
  deletePurchasedItems,
})(Dashboard);
