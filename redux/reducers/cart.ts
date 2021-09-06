import { AnyAction } from "redux";

// Types
import { Iitem } from "../../types/types";

// Action Types
import { ADD_TO_CART, REMOVE_TO_CART, SUCCESS_BUY_CLEAR_CART, CLEAR_CART, LOAD_CART } from "../actionTypes/actionTypes";

// Utils
import { addItem, deleteItem } from "../../utils/cart";

export const cartReducer = (state: Iitem[] = [], action: AnyAction) => {

    switch(action.type) {

        case ADD_TO_CART:
            return addItem(state, action.payload) 
        case REMOVE_TO_CART:
            return deleteItem(state, action.payload)
        case SUCCESS_BUY_CLEAR_CART:
            return state = []
        case CLEAR_CART:
            return state = []
        case LOAD_CART:
            return state = action.payload
        default:
            return state

    }

}