import React, { useState } from "react";
import { connect } from "react-redux";

// components
import TextInput from "../../components/TextInput";
import Dropdown from "../../components/Dropdown";
import categoryList from "./categoryDropdownData";
import Button, { buttonColor } from "../../components/Button";

// redux actions
import { addItem } from "../../actions/items";

require("./style.scss");

interface OwnProps {}

interface ReduxStateProps {}

interface ReduxDispatchProps {
  addItem: (item) => void;
}

type Props = OwnProps & ReduxStateProps & ReduxDispatchProps;

const AddItem: React.FC<Props> = (props: Props): JSX.Element => {
  const [addItemText, setAddItemText] = useState<string>("");
  const [selectedCategory, setSelectedCategory] = useState(categoryList[0]);
  const { addItem } = props;

  const handleChange = (category) => {
    setSelectedCategory(category);
  };

  const handleSubmit = (e) => {
    const newItem = {
      name: addItemText,
      category: selectedCategory.value,
    };

    addItem(newItem);

    setAddItemText("");
    setSelectedCategory(categoryList[0]);
    e.preventDefault();
  };

  return (
    <div className="add-item">
      <h2 className="add-item-title">Add an item:</h2>
      <form onSubmit={(e) => handleSubmit(e)}>
        <TextInput
          inputName="add-item"
          value={addItemText}
          onChange={(e) => setAddItemText(e.target.value)}
          className="add-item-input"
        />
        <Dropdown
          list={categoryList}
          value={selectedCategory}
          selectValue={handleChange}
          listWidth={245}
          className="add-item-dropdown"
        />
        <Button
          color={buttonColor.green}
          border={false}
          className="add-item-button"
          disabled={!addItemText || !selectedCategory.value}
        >
          Add
        </Button>
      </form>
    </div>
  );
};

const mapStateToProps = (state) => ({});

export default connect(mapStateToProps, { addItem })(AddItem);
