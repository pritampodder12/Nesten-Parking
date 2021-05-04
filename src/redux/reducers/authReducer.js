import { SET_USERDETAILS, SET_ISAUTHENTICATED, LOGOUT, LOGIN, SET_ISLOADING } from '../actions/actionTypes';

const initialState = {
    isAuthenticated: false,
    userdetails: null,
    isLoading: false
};
const authReducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_USERDETAILS:
            return { ...state, userdetails: action.payload };
        case SET_ISAUTHENTICATED:
            return { ...state, isAuthenticated: action.payload };
        case SET_ISLOADING:
            return { ...state, isLoading: action.payload }
        case LOGIN:
            return { ...state, isAuthenticated: action.payload.isAuthenticated, userdetails: action.payload.userdetails }
        case LOGOUT:
            return initialState;
        default:
            return state;
    }
};
export default authReducer;
