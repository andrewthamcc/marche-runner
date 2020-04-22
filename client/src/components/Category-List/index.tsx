import React, { useEffect, useState, useRef } from "react";
import { connect } from "react-redux";
import { Item } from "../../models/item";

// react components
import Symbol, { symbolType } from "../Symbol";
import CategoryListItem from "./Category-List-Item";
import CategoryIcon, { catIconType } from "../Category-Icon";
import Button from "../Button";
import TextInput from "../TextInput";

// redux actions
import { addItem } from "../../actions/items";

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
  bakery: { title: "Bakery", icon: catIconType.bakery },
  beverage: { title: "Beverages", icon: catIconType.beverage },
  dairy: { title: "Dairy & Cheese", icon: catIconType.dairy },
  dry: { title: "Dry & Canned Goods", icon: catIconType.dry },
  frozen: { title: "Frozen Foods", icon: catIconType.frozen },
  household: { title: "Household Items", icon: catIconType.household },
  meat: { title: "Meat", icon: catIconType.meat },
  personal: { title: "Personal Items", icon: catIconType.personal },
  pharmacy: { title: "Pharmacy", icon: catIconType.pharmacy },
  prepared: { title: "Deli & Prepared Foods", icon: catIconType.prepared },
  produce: { title: "Fruits & Vegetables", icon: catIconType.produce },
  seafood: { title: "Seafood", icon: catIconType.seafood },
};

interface OwnProps {
  category: categoryType;
  items: Item[];
}

interface ReduxStateProps {}

interface ReduxDispatchProps {
  addItem: (item) => void;
}

type Props = OwnProps & ReduxStateProps & ReduxDispatchProps;

const CategoryList: React.FC<Props> = (props: Props): JSX.Element => {
  const [categoryItems, setCategoryItems] = useState<Item[]>([]);
  const [addItemView, setAddItemView] = useState<boolean>(false);
  const [newItem, setNewItem] = useState<string>("");
  const { addItem, category, items } = props;
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (props.items) {
      const filteredItems = items.filter((item) => item.category === category);
      setCategoryItems(filteredItems);

      // focuses input
      if (inputRef.current) {
        inputRef.current.focus();
      }
    }

    // eslint-disable-next-line
  }, [props, addItemView]);

  const handleSubmit = (e) => {
    e.preventDefault();

    const newItemData = {
      name: newItem,
      category,
    };

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
          ref={inputRef} // todo: investigate the weird prop stuff on this
          onBlur={handleInputBlur}
        />
        <Button
          border={false}
          className="category-list-form-button"
          disabled={newItem === ""}
        >
          <Symbol
            symbolType={symbolType.addGreen}
            className="category-list-form-button-icon"
          />
        </Button>
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
    <div className="category-list">
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

        <span
          className="category-list-control-icon"
          onClick={() => setAddItemView(!addItemView)}
        >
          <Symbol
            symbolType={addItemView ? symbolType.close : symbolType.addOrange}
          />
        </span>
      </div>
      <hr />
      <ul>{!categoryItems.length ? renderEmptyList() : renderListItems()}</ul>
    </div>
  );
};

const mapStateToProps = (state) => ({});

export default connect(mapStateToProps, { addItem })(CategoryList);
