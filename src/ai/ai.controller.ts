import { Controller, Post, UseGuards, UseInterceptors } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { Roles } from 'src/auth/decorators/role.decorator';
import { JwtGuard } from 'src/auth/guards/jwt.guard';
import { RolesGuard } from 'src/auth/guards/role.guard';
import { Role } from 'src/auth/Roles/role.enum';

@Controller('ai')
@UseGuards(JwtGuard, RolesGuard)
export class AiController {

  @Post('scan')
  @Roles(Role.Farmer)
  @UseInterceptors(
    FileInterceptor('file')
  )
  uploadAndScanImage() {

  }
}
