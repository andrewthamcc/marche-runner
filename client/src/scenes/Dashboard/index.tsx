import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { AppState } from "../../reducers";
import { Item } from "../../models/item";

// components
import Layout from "../../layout";
import CategoryList, { categoryType } from "../../components/Category-List";
import CategoryItem from "../../components/Category-List/Category-List-Item";
import CombinedList from "../../components/Combined-List";
import TextInput from "../../components/TextInput";
import Dropdown, { DropdownItem } from "../../components/Dropdown";
import categoryDropdownList from "./categoryDropdownList";
import CategoryIcon, { catIconType } from "../../components/Category-Icon";
import Symbol, { symbolType } from "../../components/Symbol";
import ConfirmationModal from "../../components/Modal/ConfirmationModal";
import useModal from "../../utils/useModal";
import LoadingSpinner from "../../components/Loader";

// react actions
import {
  clearSearch,
  clearError,
  deleteAllItems,
  deletePurchasedItems,
  getItems,
  searchItems,
} from "../../actions/items";
import { showToast, toastType } from "../../actions/ui";

require("./style.scss");

interface OwnProps {}

interface ReduxStateProps {
  error: any;
  items: Item[];
  loading: boolean;
  searchResults: Item[];
}

interface ReduxDispatchProps {
  clearError: () => void;
  clearSearch: () => void;
  deleteAllItems: () => void;
  deletePurchasedItems: () => void;
  getItems: () => void;
  searchItems: (item: string) => void;
  showToast: (message: string, type: toastType) => void;
}

type Props = OwnProps & ReduxStateProps & ReduxDispatchProps;

enum deleteType {
  allPurchased = "allPurchased",
  purchased = "purchased",
}

const Dashboard: React.FC<Props> = (props: Props): JSX.Element => {
  const deleteDropdownList = [
    {
      text: "Delete...",
      value: null,
      disabled: true,
    },
    {
      text: "Purchased Items",
      value: deleteType.purchased,
      fn: () => openModal(),
    },
    {
      text: "All Items",
      value: deleteType.allPurchased,
      fn: () => openModal(),
    },
  ];

  // state
  const [deleteSelection, setDeleteSelection] = useState<DropdownItem>(
    deleteDropdownList[0]
  );
  const [searchText, setSearchText] = useState<string>("");
  const [selectListView, setSelectListView] = useState<DropdownItem>(
    categoryDropdownList[0]
  );

  // props
  const {
    clearError,
    clearSearch,
    deleteAllItems,
    deletePurchasedItems,
    error,
    items,
    getItems,
    loading,
    searchItems,
    searchResults,
    showToast,
  } = props;

  // other hooks
  const { open, openModal, closeModal } = useModal();

  useEffect(() => {
    // display toast if error
    if (error) {
      showToast("An unexpected error occured.", toastType.error);

      setTimeout(() => {
        clearError();
      }, 3100); // toast lasts 3secs clear after
    }

    // fetch items when items are empty
    if (items.length === 0) {
      getItems();
    }

    if (searchText === "" && items.length > 0) {
      clearSearch();
    } else if (searchText !== "") {
      searchItems(searchText);
    }

    // revert the list to default when the modal closes
    if (open === false) {
      setDeleteSelection(deleteDropdownList[0]);
    }
    // eslint-disable-next-line
  }, [
    clearSearch,
    // deleteDropdownList, // this causes infinte re-renders when added to the dependency array
    error,
    getItems,
    open,
    searchItems,
    searchText,
  ]);

  const clearInput = () => {
    setSearchText("");
    clearSearch();
  };

  const handleDeleteConfirmation = () => {
    if (deleteSelection.value === deleteType.allPurchased) {
      deleteAllItems();
    } else if (deleteSelection.value === deleteType.purchased) {
      deletePurchasedItems();
    }

    closeModal();
  };

  // dashboard controls
  const renderControls = () => {
    return (
      <>
        <div className="dashboard-controls-input">
          {selectListView.value === categoryType.allItems && (
            <TextInput
              label="Search:"
              inputName="search-item-input"
              value={searchText}
              onChange={(e) => setSearchText(e.target.value)}
              placeholder="Search"
              className="dashboard-controls-input-field"
              disabled={items.length === 0}
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
              label="View:"
              list={categoryDropdownList}
              value={selectListView}
              selectValue={(selection) => setSelectListView(selection)}
              width={245}
              listWidth={265}
              className="dashboard-controls-dropdown"
            />
            <Dropdown
              label="Delete:"
              list={deleteDropdownList}
              value={deleteSelection}
              selectValue={(selection) => setDeleteSelection(selection)}
              className="dashboard-controls-dropdown"
              disabled={items.length === 0}
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
    if (selectListView.value === categoryType.allItems) {
      return (
        <div className="dashboard-grid">
          {categoryDropdownList.map((category) => {
            if (
              category.value !== categoryType.allItems &&
              category.value !== categoryType.combinedlist
            ) {
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

    // returns single combined list view
    if (selectListView.value === categoryType.combinedlist) {
      return (
        <div className="dashboard-single-list">
          <CombinedList items={items} />
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

  return (
    <Layout>
      {open && (
        <ConfirmationModal
          isModalOpen={open}
          close={closeModal}
          title={`Delete ${deleteSelection.text}?`}
          confirm={() => handleDeleteConfirmation()}
        />
      )}

      {loading ? (
        <LoadingSpinner />
      ) : (
        <div className="dashboard">
          <div className="container">
            <div className="dashboard-controls">{renderControls()}</div>
            {renderList()}
          </div>
        </div>
      )}
    </Layout>
  );
};

const mapStateToProps = (state: AppState) => ({
  error: state.itemState.error,
  items: state.itemState.items,
  loading: state.itemState.loading,
  searchResults: state.itemState.searchResults,
});

export default connect(mapStateToProps, {
  clearError,
  clearSearch,
  deleteAllItems,
  deletePurchasedItems,
  getItems,
  searchItems,
  showToast,
})(Dashboard);
