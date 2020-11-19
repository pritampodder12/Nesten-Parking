import {combineReducers} from 'redux';

import uiReducer from './uiReducer';

const rootReducer = combineReducers({
  uiReducer,
});
export default rootReducer;
