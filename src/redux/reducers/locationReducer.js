import { SET_CURRENT_LOCATION, SET_GPS_ENABLED, SET_USERDETAILS, SET_IDTOKEN, SET_ISAUTHENTICATED, SET_ISLOADING } from '../actions/actionTypes';

const initialState = {
    gpsEnabled: false,
    currentLocation: null,
};
const locationReducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_GPS_ENABLED:
            return { ...state, gpsEnabled: action.payload };
        case SET_CURRENT_LOCATION:
            return { ...state, currentLocation: action.payload };
        default:
            return state;
    }
};
export default locationReducer;
