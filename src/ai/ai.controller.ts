import { Controller, Get, Post, Req, UploadedFile, UploadedFiles, UseGuards, UseInterceptors } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { Roles } from 'src/auth/decorators/role.decorator';
import { JwtGuard } from 'src/auth/guards/jwt.guard';
import { RolesGuard } from 'src/auth/guards/role.guard';
import { Role } from 'src/auth/Roles/role.enum';
import { AiService } from './ai.service';
import { fileNameEditor, imageFileFilter } from 'src/utils/filter';

@Controller('ai')
@UseGuards(JwtGuard, RolesGuard)
export class AiController {

  constructor(private aiService: AiService) {}

  @Post('scan')
  @Roles(Role.Farmer)
  @UseInterceptors(
    FileInterceptor('file', {
      storage: diskStorage({
        destination: './uploads',
        filename: fileNameEditor
      })
    })
  )
  uploadAndScanImage(
    @UploadedFile() file: Express.Multer.File,
    @Req() req: any
  ) {
    console.log(file);
    return this.aiService.uploadFile(req.user.userId, file);
  }

  @Get('scans')
  getAllScans(@Req() req: any) {
    return this.aiService.getAllScans(req.user.userId);
  }
}
