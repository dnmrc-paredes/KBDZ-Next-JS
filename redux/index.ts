import { createStore } from "redux";
import { persistStore, persistReducer } from 'redux-persist'
import storage from 'redux-persist/lib/storage'
import { composeWithDevTools } from 'redux-devtools-extension';

// Root Reducer
import { rootReducer } from "./reducers/root";

const persistConfig = {
    key: 'KBDZ',
    storage,
    whitelist: ['cart']
}

const persistedReducer = persistReducer(persistConfig, rootReducer)
export const store = createStore(persistedReducer, composeWithDevTools())
export const persistor = persistStore(store)