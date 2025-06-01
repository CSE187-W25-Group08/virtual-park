export interface Vehicle {
    id: string,
    licensePlate: string,
    driver: string,
    make: string,
    model: string,
    color: string,
    active: boolean,
    type?: string,
}

export interface VehicleForm {
    licensePlate: string,
    make: string,
    model: string,
    color: string,
    active: boolean
}
