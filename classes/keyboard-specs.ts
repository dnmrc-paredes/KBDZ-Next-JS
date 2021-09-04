export class KeyboardSpecs {
    uid: string
    id: string | number
    name: string
    brand: string
    weight: string
    usbConnector: string
    switches: string
    price: number
    stocks: number

    constructor(uid: string, id: string | number, name: string, brand: string, weight: string, usbConnector: string, switches: string, price: number, stocks: number) {
        this.uid = uid
        this.id = id
        this.name = name
        this.brand = brand
        this.weight = weight
        this.usbConnector = usbConnector
        this.switches = switches
        this.price = price
        this.stocks = stocks
    }

}