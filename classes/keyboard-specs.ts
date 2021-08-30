export class KeyboardSpecs {
    id: string | number
    name: string
    brand: string
    weight: string
    dimensions: string
    usbType: string
    connectivity: string
    matrix: string
    switches: string

    constructor(id: string | number, name: string, brand: string, weight: string, dimensions: string, usbType: string, connectivity: string, matrix: string, switches: string) {
        this.id = id
        this.name = name
        this.brand = brand
        this.weight = weight
        this.dimensions = dimensions
        this.usbType = usbType
        this.connectivity = connectivity
        this.matrix = matrix
        this.switches = switches
    }

}