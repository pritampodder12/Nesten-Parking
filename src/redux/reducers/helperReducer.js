import {
  TOGGLE_LOADER,
  SHOW_SNACKBAR,
  HIDE_SNACKBAR,
} from '../actions/actionTypes';

const initialState = {
  visibleLoader: false,
  visibleSnackbar: false,
  dropdownRef: null,
  snackbarMessage: '',
};
const helperReducer = (state = initialState, action) => {
  let {payload} = action;
  switch (action.type) {
    case TOGGLE_LOADER:
      return {...state, visibleLoader: !state.visibleLoader};
    case SHOW_SNACKBAR:
      return {
        ...state,
        snackbarMessage: payload.message,
        visibleSnackbar: true,
      };
    case HIDE_SNACKBAR:
      return {...state, visibleSnackbar: false};

    default:
      return state;
  }
};
export default helperReducer;
