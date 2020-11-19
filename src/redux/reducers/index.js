import {combineReducers} from 'redux';

import helperReducer from './helperReducer';

const rootReducer = combineReducers({
  helperReducer,
});
export default rootReducer;
