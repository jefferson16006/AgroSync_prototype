import { Body, Controller, Get, Post, Req } from '@nestjs/common';
import { AuthLoginDto, AuthRegisterDto } from './dto';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {

	constructor(private authService: AuthService) {}

	@Post('signup')
	register(@Body() dto: AuthRegisterDto) {
		return this.authService.registerUser(dto);
	}

  @Post('login')
  login(@Body() dto: AuthLoginDto) {
    return this.authService.logUserIn(dto)
  }

  @Get('status')
  status(@Req() req: any) {
    return req.user!;
  }
}
