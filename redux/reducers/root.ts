import { combineReducers } from "redux";

// Reducers
import { cartReducer } from "./cart";

export const rootReducer = combineReducers({
    cart: cartReducer
})