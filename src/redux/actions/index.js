import {
  TOGGLE_LOADER,
  SET_DROPDOWN_ALERT,
  SHOW_DROPDOWN_ALERT,
} from './actionTypes';

export const toggleLoader = () => (dispatch) => {
  dispatch({
    type: TOGGLE_LOADER,
  });
};
export const setDropdownAlert = (ref) => (dispatch) => {
  dispatch({
    type: SET_DROPDOWN_ALERT,
    payload: ref,
  });
};
export const showDropdownAlert = (alertType, title, message) => (dispatch) => {
  dispatch({
    type: SHOW_DROPDOWN_ALERT,
    payload: {alertType, title, message},
  });
};
