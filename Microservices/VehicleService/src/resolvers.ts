import { VehicleResolver } from './vehicle/resolver'
import { OCRResolver } from './ocr/resolver'

export const resolvers = [VehicleResolver, OCRResolver] as const
