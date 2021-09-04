import { Iitem } from "../types/types";

// Classes
import { CartItem } from "../classes/cartItem";

export const addItem = (items: Iitem[], toBeAdded: { id: string | number, price: number }) => {

    const newItem = new CartItem(toBeAdded.id, 1, toBeAdded.price, toBeAdded.price)

    const ifExist = items.find(itemData => itemData.id === toBeAdded.id)

    if (ifExist) {
        ifExist.qty++
        // ifExist.price+=toBeAdded.price
        ifExist.total+=toBeAdded.price
        return [...items]
    }

    return [...items, newItem]

}

export const deleteItem = (items: Iitem[], toBeDeleted: { id: string | number, price: number }) => {

    const ifZero = items.find(itemData => itemData.id === toBeDeleted.id)

    if (ifZero!.qty === 1) {
        return [...items.filter(itemData => itemData.id !== toBeDeleted.id)]
    }

    ifZero!.qty--
    ifZero!.total-=toBeDeleted.price
    return [...items]

} 