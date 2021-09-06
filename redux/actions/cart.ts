import { setDoc, doc, getDoc } from "firebase/firestore"; 
import { signOut } from "@firebase/auth";

// Firebase
import { firebaseDB } from "../../firebase/client";
import { firebaseAuth } from "../../firebase/client";

// Types
import { Iitem, thunkDis } from "../../types/types"

// Action Types
import { ADD_TO_CART, REMOVE_TO_CART, SUCCESS_BUY_CLEAR_CART, LOAD_CART, CLEAR_CART } from "../actionTypes/actionTypes"

export const addToCart = (id: string | number, price?: number) => {

    return {
        type: ADD_TO_CART,
        payload: {
            id,
            price
        }
    }

}

export const removeToCart = (id: string | number, price?: number) => {

    return {
        type: REMOVE_TO_CART,
        payload: {
            id,
            price
        }
    }

}

export const sucessBuyClear = () => {
    return {
        type: SUCCESS_BUY_CLEAR_CART
    }
}

export const clearCart = (userUID: string, items: Iitem[]) => {
    

    return async (dispatch: thunkDis) => {

        await setDoc(doc(firebaseDB, 'carts', userUID), {
            cartItems: [...items.map(obj => Object.assign({}, obj))]
        })
        await signOut(firebaseAuth)

        dispatch({
            type: CLEAR_CART
        })

    }

}

export const loadCart = (userUID: string) => {

    return async (dispatch: thunkDis) => {

        const cartRef = doc(firebaseDB, 'carts', userUID)
        const usersCart = await getDoc(cartRef)

        dispatch({
            type: LOAD_CART,
            payload: usersCart.data() ? usersCart.data()!.cartItems : []
        })

    }

}