export interface Ikeyboard {
    id: number | string
    brand?: string
    name?: string
    weight?: string
    switches?: string
    usbConnector?: string
}

export interface Icart {
    cart: [{
        id: string
        qty: number
    }]
}