import { createStore, applyMiddleware } from 'redux';
import { persistStore, persistReducer } from 'redux-persist'
import thunk from 'redux-thunk';
import AsyncStorage from '@react-native-async-storage/async-storage';

import rootReducer from '../reducers';

const persistConfig = {
    key: 'root',
    storage: AsyncStorage,
    whitelist: ['authReducer','locationReducer']
}
const persistedReducer = persistReducer(persistConfig, rootReducer)
const middleware = [thunk];

export default () => {
    let store = createStore(persistedReducer, applyMiddleware(...middleware))
    let persistor = persistStore(store)
    return { store, persistor }
}
// export default store = createStore(rootReducer, applyMiddleware(...middleware));
