import {
  Controller,
  Response,
  Route,
  SuccessResponse,
  Get,
  Query,
  Security
} from 'tsoa'
import { hasActivePermitForPlate } from './policeService';


@Route('police')
@Security('api_key') 
export class PoliceController extends Controller {

  @Get('')
  @Response('401', 'Unauthorized')
  @Response('409', 'Error')
  @SuccessResponse('200', 'Gets ticket bool succesfully')
  public async checkPermit(
      @Query() plate: string
  ): Promise<string> {

    return await hasActivePermitForPlate(plate)
  }

}
