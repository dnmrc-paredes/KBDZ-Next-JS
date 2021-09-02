export interface Ikeyboard {
    id: number | string
    brand?: string
    name?: string
    weight?: string
    switches?: string
    usbConnector?: string
    price: number
}

export interface Iitem {
    id: string | number
    qty: number
    price: number
    total: number
}

export interface IrootState {
    cart: Iitem[]
}