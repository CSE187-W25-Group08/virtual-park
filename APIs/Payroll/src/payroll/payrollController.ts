import {
  Controller,
  Response,
  Route,
  SuccessResponse,
  Get,
  Query,
} from 'tsoa'
import { emailContainsTickets } from './payrollService'


@Route('payroll')
export class PayrollController extends Controller {

  @Get('')
  @Response('409', 'Error')
  @SuccessResponse('200', 'Gets ticket bool succesfully')
  public async signup(
      @Query() email: string
  ): Promise<boolean | undefined> {

    const hasPaidTickets = await emailContainsTickets(email)
    return hasPaidTickets;
  }

}
