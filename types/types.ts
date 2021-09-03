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

export interface IpayerPaypal {
    email_address: string
    name: {
        given_name: string
        surname: string
    }
    address: {
        address_line_1: string
        address_line_2: string
        admin_area_1: string
        admin_area_2: string
        country_code: string
        postal_code: string
    }
} 

export type Tpaymaya = {
    checkoutId: string
    redirectUrl: string
}