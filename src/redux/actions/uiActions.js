import {TOGGLE_LOADER, SHOW_SNACKBAR, HIDE_SNACKBAR} from './actionTypes';

export const toggleLoader = () => (dispatch) => {
  dispatch({
    type: TOGGLE_LOADER,
  });
};
export const showSnackbar = (message) => (dispatch) => {
  dispatch({
    type: SHOW_SNACKBAR,
    payload: {message},
  });
};
export const hideSnackbar = () => (dispatch) => {
  dispatch({
    type: HIDE_SNACKBAR,
  });
};
