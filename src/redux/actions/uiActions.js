import { TOGGLE_LOADER, SHOW_LOADER, HIDE_LOADER } from './actionTypes';
import { showMessage } from 'react-native-flash-message';

export const toggleLoader = () => (dispatch) => {
  dispatch({
    type: TOGGLE_LOADER,
  });
};
export const showLoader = () => (dispatch) => {
  dispatch({
    type: SHOW_LOADER,
  });
};
export const hideLoader = () => (dispatch) => {
  dispatch({
    type: HIDE_LOADER,
  });
};
export const showSnackbar = (message, type = "default") => () => {
  let obj = { message, type };
  if (type == 'default') obj['backgroundColor'] = '#313131';
  showMessage(obj);
};
