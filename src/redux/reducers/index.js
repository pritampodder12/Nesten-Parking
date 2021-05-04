import {combineReducers} from 'redux';

import uiReducer from './uiReducer';
import locationReducer from './locationReducer';
import authReducer from './authReducer';
import placepodReducer from './placepodReducer';

const rootReducer = combineReducers({
  uiReducer,
  locationReducer,
  authReducer,
  placepodReducer
});
export default rootReducer;
