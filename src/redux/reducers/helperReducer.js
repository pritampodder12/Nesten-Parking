import {
  TOGGLE_LOADER,
  SET_DROPDOWN_ALERT,
  SHOW_DROPDOWN_ALERT,
} from '../actions/actionTypes';

const initialState = {
  showLoader: false,
  dropdownRef: null,
  locationPermissionAllowed: false,
  internetConnected: false,
};
const helperReducer = (state = initialState, action) => {
  switch (action.type) {
    case TOGGLE_LOADER:
      return {...state, showLoader: !state.showLoader};
    case SET_DROPDOWN_ALERT:
      return {...state, dropdownRef: action.payload};
    case SHOW_DROPDOWN_ALERT:
      let {payload} = action;
      if (state.dropdownRef !== null) {
        state.dropdownRef.alertWithType(
          payload.alertType,
          payload.title,
          payload.message,
        );
      }
      return state;
    default:
      return state;
  }
};
export default helperReducer;
