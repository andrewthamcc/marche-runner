import { SHOW_TOAST, HIDE_TOAST } from "../../actions/ui/types";
import { toastType } from "../../actions/ui/";

class UIState {
  displayToast: boolean = false;
  toastMessage: string = "";
  toastType: toastType | null = null;
}

const initialState = new UIState();

const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case SHOW_TOAST:
      return {
        ...state,
        displayToast: true,
        toastMessage: action.payload.message,
        toastType: action.payload.toastType,
      };
    case HIDE_TOAST:
      return new UIState();
    default:
      return state;
  }
};

export default authReducer;
