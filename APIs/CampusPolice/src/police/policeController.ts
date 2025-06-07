import {
  Controller,
  Response,
  Route,
  SuccessResponse,
  Get,
  Security,
  Query
} from 'tsoa'

import { PoliceService } from './policeService'
import { Permit } from '.'

@Route('police')
@Security('api_key') 
export class PoliceController extends Controller {

  @Get('/test')
  @Response('401', 'Unauthorized')
  @SuccessResponse('200', 'API Key Success')
  public async testKey(): Promise<string> {
    const response = await new PoliceService().hasValidAPIKey()
    return response
  }

  @Get('/permit')
  @Response('401', 'Unauthorized')
  @SuccessResponse('200', 'Permit Response')
  public async checkPermit(
    @Query() plate: string
  ): Promise<boolean> {
    return new PoliceService().checkPermitFromPlate(plate)
      .then(async (permits: Permit[]): Promise<boolean> => {
        if (permits.length > 0) {
          const validPermit = permits.filter(permit => permit.isValid)
          if (validPermit.length > 0) {
            return true
          }
          return false
        }

        return false
      })
  }

}
