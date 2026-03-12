import { Controller, Get, Req, UseGuards } from '@nestjs/common';
import { Roles } from 'src/auth/decorators/role.decorator';
import { JwtGuard } from 'src/auth/guards/jwt.guard';
import { RolesGuard } from 'src/auth/guards/role.guard';
import { Role } from 'src/auth/Roles/role.enum';

@Controller('users')
@UseGuards(JwtGuard, RolesGuard)
export class UsersController {

  @Roles(Role.Farmer)
  @Get('me')
  getUser(@Req() req: any) {
    return req.user!
  }
}
