import React from "react";
import { connect } from "react-redux";
import { Item } from "../../../models/item";

// components
import Checkbox from "../../../components/Checkbox";
import Icon, { iconType, iconColor } from "../../Icon";

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
        {/* todo: investigate: inline edit may not be needed with the delete button and add button more easily accessible by the user */}
        {/* <span className="category-list-item-controls-edit">
          <Icon iconType={iconType.pencil} />
        </span> */}
        <span
          className="category-list-item-controls-delete"
          onClick={() => deleteItem(_id)}
        >
          <Icon iconType={iconType.trash} color={iconColor.grey} />
        </span>
      </div>
    </li>
  );
};

const mapStateToProps = (state) => ({});

export default connect(mapStateToProps, { editItem, deleteItem })(index);
