import { createStore } from "redux";
import { composeWithDevTools } from 'redux-devtools-extension';

// Root Reducer
import { rootReducer } from "./reducers/root";

export const store = createStore(rootReducer, composeWithDevTools())