import { Dispatch } from "../index";
import { SHOW_TOAST, HIDE_TOAST } from "./types";

export enum toastType {
  warning = "warning",
  error = "error",
  success = "success",
}

export const showToast = (message: string, toastType: toastType = null) => (
  dispatch: Dispatch
) => {
  const toastInfo = {
    message,
    toastType,
  };

  dispatch({
    type: SHOW_TOAST,
    payload: toastInfo,
  });

  // hidetoast after 3 secs
  setTimeout(() => {
    dispatch({
      type: HIDE_TOAST,
    });
  }, 3000);
};

export const hideToast = () => (dispatch: Dispatch) => {
  dispatch({
    type: HIDE_TOAST,
  });
};
