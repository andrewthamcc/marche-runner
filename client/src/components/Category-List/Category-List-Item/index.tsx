import React from "react";
import { connect } from "react-redux";
import { AppState } from "../../../reducers";
import { Item } from "../../../models/item";

// components
import Checkbox from "../../../components/Checkbox";
import IconButton from "../../Icon-Button";
import { iconType } from "../../Icon";

// redux actions
import { editItem, deleteItem } from "../../../actions/items";

require("./style.scss");

interface OwnProps {
  item: Item;
}

interface ReduxStateProps {}

interface ReduxDispatchProps {
  editItem: (id: string, data: any) => void;
  deleteItem: (id: string) => void;
}

type Props = OwnProps & ReduxStateProps & ReduxDispatchProps;

const index: React.FC<Props> = (props: Props): JSX.Element => {
  // props
  const { editItem, deleteItem, item } = props;
  const { _id, purchased, name } = item;

  const handleChange = () => {
    const editedField = {
      purchased: !purchased,
    };

    editItem(_id, editedField);
  };

  return (
    <li className="category-list-item">
      <div className="category-list-item-description">
        <Checkbox
          checked={purchased}
          className="category-list-item-checkbox"
          inputID={`checkbox-${_id}`}
          inputName="item-checkbox"
          label={name}
          onChange={handleChange}
        />
      </div>

      <div className="category-list-item-controls">
        <IconButton
          icon={iconType.trash}
          className="category-list-item-controls-delete"
          onClick={() => deleteItem(_id)}
        />
      </div>
    </li>
  );
};

const mapStateToProps = (state: AppState) => ({});

export default connect(mapStateToProps, { editItem, deleteItem })(index);
