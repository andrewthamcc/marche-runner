import React, { useEffect, useState, useRef } from "react";
import { connect } from "react-redux";

// components
import CategoryListItem from "./Category-List-Item";
import CategoryIcon, { catIconType } from "../Category-Icon";
import IconButton from "../Icon-Button";
import { iconType, iconColor } from "../Icon";
import { symbolType } from "../Symbol";
import TextInput from "../TextInput";

// redux actions
import { addItem } from "../../actions/items";
import { showToast, toastType } from "../../actions/ui";

// models
import { Item } from "../../models/item";
import { AddItemData } from "../../models/item";

require("./style.scss");

export enum categoryType {
  allItems = "allItems",
  bakery = "bakery",
  beverage = "beverage",
  dairy = "dairy",
  dry = "dry",
  frozen = "frozen",
  household = "household",
  meat = "meat",
  personal = "personal", // to be deprecated by May 10
  pharmacy = "pharmacy",
  prepared = "prepared",
  produce = "produce",
  seafood = "seafood",
  combinedlist = "combinedlist",
  snack = "snack",
}

const categoryInfo = {
  bakery: { title: "Bakery", icon: catIconType.bakery },
  beverage: { title: "Beverages", icon: catIconType.beverage },
  dairy: { title: "Dairy & Cheese", icon: catIconType.dairy },
  dry: { title: "Dry & Canned Goods", icon: catIconType.dry },
  frozen: { title: "Frozen Foods", icon: catIconType.frozen },
  household: { title: "Household Items", icon: catIconType.household },
  meat: { title: "Meat", icon: catIconType.meat },
  // personal: { title: "Personal Items", icon: catIconType.personal },
  pharmacy: { title: "Pharmacy & Personal Items", icon: catIconType.pharmacy },
  prepared: { title: "Deli & Prepared Foods", icon: catIconType.prepared },
  produce: { title: "Fruits & Vegetables", icon: catIconType.produce },
  seafood: { title: "Seafood", icon: catIconType.seafood },
  snack: { title: "Snacks", icon: catIconType.snack },
  combinedlist: { title: "Combined List", icon: catIconType.list },
};

interface OwnProps {
  category: categoryType;
  items: Item[];
}

interface ReduxStateProps {}

interface ReduxDispatchProps {
  addItem: (newItem: AddItemData) => void;
  showToast: (message: string, toastType: toastType) => void;
}

type Props = OwnProps & ReduxStateProps & ReduxDispatchProps;

const CategoryList: React.FC<Props> = (props: Props): JSX.Element => {
  // state
  const [addItemView, setAddItemView] = useState<boolean>(false);
  const [categoryItems, setCategoryItems] = useState<Item[]>([]);
  const [newItem, setNewItem] = useState<string>("");

  // props
  const { addItem, category, items, showToast } = props;

  // other hooks
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (items) {
      const filteredItems = items
        .filter((item) => {
          // deprecate by May 10th
          if (
            item.category === categoryType.personal &&
            category === categoryType.pharmacy
          ) {
            return item;
          }

          return item.category === category;
        })
        .reverse();

      // sorts to move purchased items automatically to bottom of list - this could be REALLY bad UX
      // .sort((a, b) =>
      //   a.purchased === b.purchased ? 0 : a.purchased ? 1 : -1
      // );

      setCategoryItems(filteredItems);

      // focuses input
      if (inputRef.current) {
        inputRef.current.focus();
      }
    }
  }, [addItemView, category, items]);

  const handleSubmit = (e) => {
    e.preventDefault();

    const newItemData: AddItemData = {
      name: newItem,
      category,
    };

    const duplicateItem = items.find(
      (item) => item.name.toLowerCase() === newItemData.name.toLowerCase()
    );

    // show warning toast on adding duplicate items
    if (duplicateItem) {
      showToast("Adding duplicate item", toastType.warning);
    }

    addItem(newItemData);
    setNewItem("");
  };

  // close input when losing focus
  const handleInputBlur = () => {
    if (newItem === "") {
      setAddItemView(false);
    }
  };

  const renderAddItemInput = () => {
    return (
      <form onSubmit={(e) => handleSubmit(e)} className="category-list-form">
        <TextInput
          className="category-list-form-input"
          value={newItem}
          onChange={(e) => setNewItem(e.target.value)}
          inputName="add-item-input"
          placeholder="Add an item..."
          ref={inputRef} // todo: investigate the prop stuff on this
          onBlur={handleInputBlur}
        />
        <IconButton
          symbol={newItem === "" ? symbolType.addDisable : symbolType.addGreen}
          className="category-list-form-button"
          disabled={newItem === ""}
        />
      </form>
    );
  };

  const renderEmptyList = () => {
    return <li className="category-list-item-empty">Nothing here...</li>;
  };

  const renderListItems = () => {
    // filter items to only display category related items
    if (categoryItems) {
      return categoryItems.map((item) => (
        <CategoryListItem key={item._id} item={item} />
      ));
    }
  };

  return (
    <div className={`category-list ${!categoryItems.length ? "empty" : ""}`}>
      <div className="category-list-header">
        <CategoryIcon
          iconType={categoryInfo[category].icon}
          className="category-list-icon"
        />
        {addItemView ? (
          renderAddItemInput()
        ) : (
          <h3 className="category-list-title">
            {categoryInfo[category].title}
          </h3>
        )}

        <IconButton
          className="category-list-control-icon"
          color={iconColor.red}
          icon={addItemView ? iconType.close : null}
          symbol={!addItemView ? symbolType.addOrange : null}
          onClick={() => setAddItemView(!addItemView)}
        />
      </div>
      <hr />
      <ul>{!categoryItems.length ? renderEmptyList() : renderListItems()}</ul>
    </div>
  );
};

const mapStateToProps = (state) => ({});

export default connect(mapStateToProps, { addItem, showToast })(CategoryList);
