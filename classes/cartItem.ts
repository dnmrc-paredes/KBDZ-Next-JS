export class CartItem {

    id: string | number
    qty: number
    price: number
    total: number
    
    constructor(id: string | number, qty: number, price: number, total: number) {
        this.id = id
        this.qty = qty
        this.price = price
        this.total = total
    }

    increasedQty() {
        return this.qty+=1
    }

}