import {
  TOGGLE_LOADER,
  SHOW_LOADER,
  HIDE_LOADER,
} from '../actions/actionTypes';

const initialState = {
  visibleLoader: false,
  dropdownRef: null,
  snackbarMessage: '',
  flashRef: null
};
const uiReducer = (state = initialState, action) => {
  let { payload } = action;
  switch (action.type) {
    case TOGGLE_LOADER:
      return { ...state, visibleLoader: !state.visibleLoader };
    case SHOW_LOADER:
      return { ...state, visibleLoader: true }
    case HIDE_LOADER:
      return { ...state, visibleLoader: false }
    default:
      return state;
  }
};
export default uiReducer;
