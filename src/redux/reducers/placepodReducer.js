import { SET_EARNINGS, SET_PLACEPODCOLLECTION, SET_REGISTEREDPLACEPODS, SET_CANCLEBOOKINGS, SET_PASTBOOKINGS, SET_UPCOMINGBOOKINGS, SET_ONGOINGBOOKINGS } from '../actions/actionTypes';

const initialState = {
    placepodCollection: { type: 'FeatureCollection', features: [] },
    registeredPlacepods: {
        data: [],
        endReached: false,
        slice: 0
    },
    earnings: {
        data: [],
        total: '',
        endReached: false,
        slice: 0
    },
    cancleBookings: {
        data: [],
        endReached: false,
        slice: 0
    },
    pastBookings: {
        data: [],
        endReached: false,
        slice: 0
    },
    upcomingBookings: {
        data: [],
        endReached: false,
        slice: 0
    },
    ongoingBookings: {
        data: [],
        endReached: false,
        slice: 0
    }
};

const placepodReducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_PLACEPODCOLLECTION:
            return { ...state, placepodCollection: { type: 'FeatureCollection', features: action.payload } }
        case SET_REGISTEREDPLACEPODS:
            return { ...state, registeredPlacepods: action.payload }
        case SET_EARNINGS:
            return { ...state, earnings: action.payload }
        case SET_CANCLEBOOKINGS:
            return { ...state, cancleBookings: action.payload }
        case SET_PASTBOOKINGS:
            return { ...state, pastBookings: action.payload }
        case SET_UPCOMINGBOOKINGS:
            return { ...state, upcomingBookings: action.payload }
        case SET_ONGOINGBOOKINGS:
            return { ...state, ongoingBookings: action.payload }
        default:
            return state;
    }
}

export default placepodReducer;