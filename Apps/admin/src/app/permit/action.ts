'use server'



import { getPermitByDriver} from '../../permit/service'
import { Permit } from '../../permit'

export async function getUserPermits(jwt: string) : Promise<Permit[]> {
  return getPermitByDriver(jwt)
}
