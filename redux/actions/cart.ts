// Action Types

import { ADD_TO_CART, REMOVE_TO_CART } from "../actionTypes/actionTypes"

export const addToCart = (id: string) => {

    return {
        type: ADD_TO_CART,
        payload: id
    }

}

export const removeToCart = (id: string) => {

    return {
        type: REMOVE_TO_CART,
        payload: id
    }

}