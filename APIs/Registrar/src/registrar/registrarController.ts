import {
  Controller,
  Response,
  Route,
  SuccessResponse,
  Get,
  Query,
  Security
} from 'tsoa'
import { emailContainsTickets } from './registrarService';


@Route('registrar')
@Security('api_key') 
export class RegistrarController extends Controller {

  @Get('')
  @Response('401', 'Unauthorized')
  @Response('409', 'Error')
  @SuccessResponse('200', 'Gets ticket bool succesfully')
  public async checkStudentTickets(
      @Query() email: string
  ): Promise<string> {

    return await emailContainsTickets(email)
  }

}
