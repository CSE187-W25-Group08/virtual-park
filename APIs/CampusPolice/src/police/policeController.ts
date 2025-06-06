import {
  Controller,
  Response,
  Route,
  SuccessResponse,
  Get,
  Security
} from 'tsoa'
import { hasValidAPIKey } from './policeService';


@Route('police')
@Security('api_key') 
export class PoliceController extends Controller {

  @Get('/test')
  @Response('401', 'Unauthorized')
  @SuccessResponse('200', 'API Key Success')
  public async testKey(): Promise<string> {
    return await hasValidAPIKey()
  }
}
