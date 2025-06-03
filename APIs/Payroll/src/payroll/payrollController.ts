import {
  Controller,
  Response,
  Route,
  SuccessResponse,
  Get,
  Query,
  Security
} from 'tsoa'
import { emailContainsTickets } from './payrollService';


@Route('payroll')
@Security('api_key') 
export class PayrollController extends Controller {

  @Get('')
  @Response('401', 'Unauthorized')
  @Response('409', 'Error')
  @SuccessResponse('200', 'Gets ticket bool succesfully')
  public async signup(
      @Query() email: string
  ): Promise<boolean> {

    const hasPaidTickets = await emailContainsTickets(email)
    return hasPaidTickets;
  }

}
