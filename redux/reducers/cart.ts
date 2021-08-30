import { AnyAction } from "redux";
import { Icart } from "../../types/types";
import { ADD_TO_CART, REMOVE_TO_CART } from "../actionTypes/actionTypes";

// Action Types

export const cartReducer = (state: Icart[] = [], action: AnyAction) => {

    switch(action.type) {

        case ADD_TO_CART:
            return state = action.payload
        case REMOVE_TO_CART:
            return state = action.payload
        default:
            return state

    }

}