import { Body, Controller, Post, UseGuards } from '@nestjs/common';
import { PaymentsService } from './payments.service';
import { RolesGuard } from 'src/auth/guards/role.guard';
import { Roles } from 'src/auth/decorators/role.decorator';
import { Role } from 'src/auth/Roles/role.enum';
import { JwtGuard } from 'src/auth/guards/jwt.guard';

@Controller('payments')
@UseGuards(JwtGuard, RolesGuard)
export class PaymentsController {
  constructor(private paymentsService: PaymentsService) {}

  @Roles(Role.Buyer) 
  @Post('initialize')
  initialize(@Body() body: any) {
    return this.paymentsService.initializePayment(body);
  }

  @Post('verify')
  verify(@Body() body: any) {
    return this.paymentsService.verifyPayment(body);
  }
}