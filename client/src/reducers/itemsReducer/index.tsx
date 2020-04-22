import {
  GET_ITEMS,
  ADD_ITEM,
  EDIT_ITEM,
  DELETE_ITEM,
  DELETE_PURCHASED,
  DELETE_ALL,
  SEARCH_ITEMS,
  CLEAR_SEARCH,
  SET_ITEMS_LOADING,
} from "../../actions/items/types";
import { Item } from "../../models/item";

class ItemState {
  items: Item[] = [];
  loading: false;
  searchResults: Item[] = [];
}

const initialState = new ItemState();

const itemsReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_ITEMS:
      return {
        ...state,
        items: action.payload,
        loading: false,
      };
    case ADD_ITEM:
      return {
        ...state,
        items: [action.payload, ...state.items],
      };
    case EDIT_ITEM:
      const editedItems = state.items.map((item) => {
        if (item._id === action.payload._id) {
          return action.payload;
        }

        return item;
      });

      return {
        ...state,
        items: editedItems,
      };
    case DELETE_ITEM:
      const filteredItems = state.items.filter(
        (item) => item._id !== action.payload._id
      );

      return {
        ...state,
        items: filteredItems,
      };
    case DELETE_PURCHASED:
    case DELETE_ALL:
      const itemsDeleted = state.items.filter((item) => {
        if (!action.payload.includes(item._id)) {
          return item;
        }

        return null;
      });

      return {
        ...state,
        items: itemsDeleted,
        loading: false,
      };
    case SEARCH_ITEMS:
      const searchResults = state.items.filter((item) =>
        item.name.toLowerCase().includes(action.payload.toLowerCase())
      );

      return {
        ...state,
        searchResults,
      };
    case CLEAR_SEARCH:
      return {
        ...state,
        searchResults: [],
      };
    case SET_ITEMS_LOADING:
      return {
        ...state,
        loading: true,
      };
    default:
      return state;
  }
};

export default itemsReducer;
