import { Controller, Post, UploadedFile, UploadedFiles, UseGuards, UseInterceptors } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { Roles } from 'src/auth/decorators/role.decorator';
import { JwtGuard } from 'src/auth/guards/jwt.guard';
import { RolesGuard } from 'src/auth/guards/role.guard';
import { Role } from 'src/auth/Roles/role.enum';
import { AiService } from './ai.service';

@Controller('ai')
@UseGuards(JwtGuard, RolesGuard)
export class AiController {

  constructor(private aiService: AiService) {}

  @Post('scan')
  @Roles(Role.Farmer)
  @UseInterceptors(
    FileInterceptor('file')
  )
  uploadAndScanImage(
    @UploadedFile() file: Express.Multer.File
  ) {
    console.log(file);
    return this.aiService.uploadFile(file);
  }
}
