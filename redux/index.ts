import { createStore, applyMiddleware } from "redux";
import { persistStore, persistReducer } from 'redux-persist'
import storage from 'redux-persist/lib/storage'
import { composeWithDevTools } from 'redux-devtools-extension';
import thunk from 'redux-thunk';

// Root Reducer
import { rootReducer } from "./reducers/root";

const persistConfig = {
    key: 'KBDZ',
    storage
}

const persistedReducer = persistReducer(persistConfig, rootReducer)
export const store = createStore(persistedReducer, composeWithDevTools(applyMiddleware(thunk)))
export const persistor = persistStore(store)