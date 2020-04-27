import React, { useState, useRef, useEffect } from "react";
import { connect } from "react-redux";

// components
import CategoryListItem from "../Category-List/Category-List-Item";
import CategoryIcon, { catIconType } from "../Category-Icon";
import IconButton from "../Icon-Button";
import { iconType, iconColor } from "../Icon";
import { symbolType } from "../Symbol";
import TextInput from "../TextInput";
import Dropdown, { DropdownItem } from "../Dropdown";
import AddItemDropdownList from "./addItemDropdownList";

// redux actions
import { addItem } from "../../actions/items";
import { showToast, toastType } from "../../actions/ui";

// models
import { Item } from "../../models/item";
import { AddItemData } from "../../models/item";

require("./style.scss");

interface OwnProps {
  items: Item[];
}

interface ReduxStateProps {}

interface ReduxDispatchProps {
  addItem: (newItem: AddItemData) => void;
  showToast: (message: string, toastType: toastType) => void;
}

type Props = OwnProps & ReduxStateProps & ReduxDispatchProps;

const CombinedList: React.FC<Props> = (props: Props): JSX.Element => {
  // state
  const [addItemView, setAddItemView] = useState<boolean>(false);
  const [newItemName, setnewItemName] = useState<string>("");
  const [newItemCategory, setNewItemCategory] = useState<DropdownItem>(
    AddItemDropdownList[0]
  );

  // props
  const { addItem, items, showToast } = props;

  // other hooks
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  }, [addItemView]);

  const handleSubmit = (e) => {
    e.preventDefault();

    const newItemData: AddItemData = {
      name: newItemName,
      category: newItemCategory.value,
    };

    const duplicateItem = items.find(
      (item) => item.name.toLowerCase() === newItemData.name.toLowerCase()
    );

    // show warning toast on adding duplicate items
    if (duplicateItem) {
      showToast("Adding duplicate item", toastType.warning);
    }

    addItem(newItemData);

    setnewItemName("");
    setNewItemCategory(AddItemDropdownList[0]);
  };

  const renderAddItemInput = () => {
    return (
      <form onSubmit={(e) => handleSubmit(e)} className="combined-list-form">
        <TextInput
          className="combined-list-form-input"
          value={newItemName}
          onChange={(e) => setnewItemName(e.target.value)}
          inputName="add-item-input"
          placeholder="Add an item..."
          ref={inputRef}
        />
        <Dropdown
          list={AddItemDropdownList}
          value={newItemCategory}
          selectValue={(selection) => setNewItemCategory(selection)}
          width={245}
          listWidth={265}
          className="combined-list-form-dropdown"
        />
        <IconButton
          symbol={
            newItemName === "" || newItemCategory.value === null
              ? symbolType.addDisable
              : symbolType.addGreen
          }
          className="combined-list-form-button"
          disabled={newItemName === "" || newItemCategory.value === null}
        />
      </form>
    );
  };

  const renderList = () => {
    return items
      .map((item) => <CategoryListItem key={item._id} item={item} />)
      .reverse();
  };

  const renderEmptyList = () => {
    return <li className="combined-list-empty">Nothing here...</li>;
  };

  return (
    <div className={`combined-list ${!items.length ? "empty" : ""}`}>
      <div className="combined-list-header">
        {addItemView ? (
          renderAddItemInput()
        ) : (
          <>
            <CategoryIcon
              iconType={catIconType.list}
              className="combined-list-icon"
            />
            <h3 className="combined-list-title">Combined List</h3>
          </>
        )}

        <IconButton
          className="combined-list-control-icon"
          color={iconColor.red}
          icon={addItemView ? iconType.close : null}
          symbol={!addItemView ? symbolType.addOrange : null}
          onClick={() => setAddItemView(!addItemView)}
        />
      </div>
      <hr />
      <ul>{!items.length ? renderEmptyList() : renderList()}</ul>
    </div>
  );
};

const mapStateToProps = (state) => ({});

export default connect(mapStateToProps, { addItem, showToast })(CombinedList);
