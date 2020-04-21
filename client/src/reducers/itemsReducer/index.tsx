import {
  GET_ITEMS,
  ADD_ITEM,
  EDIT_ITEM,
  DELETE_ITEM,
  SEARCH_ITEMS,
  CLEAR_SEARCH,
  SET_LOADING,
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
        items: [...state.items, action.payload],
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
    case SET_LOADING:
      return {
        ...state,
        loading: true,
      };
    default:
      return state;
  }
};

export default itemsReducer;
