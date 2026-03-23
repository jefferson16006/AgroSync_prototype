import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { PrismaModule } from './prisma/prisma.module';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { ListingsModule } from './listings/listings.module';
import { AiModule } from './ai/ai.module';
import { MulterModule } from '@nestjs/platform-express';
import { join } from 'path';
import { diskStorage } from 'multer';
import { fileNameEditor, imageFileFilter } from './utils/filter';

export const FILE_UPLOAD_DIR = join(process.cwd(), 'src', 'uploads');

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true
    }),
    MulterModule.register({
      storage: diskStorage({
        filename: fileNameEditor,
        destination: FILE_UPLOAD_DIR
      }),
      dest: FILE_UPLOAD_DIR,
      limits: {
        fileSize: 5 * 1024 * 1024,
        files: 5,
        fields: 10,
        fieldSize: 10 * 1024
      },
      fileFilter: imageFileFilter
    }),
    PrismaModule,
    UsersModule,
    AuthModule,
    ListingsModule,
    AiModule,
  ]
})
export class AppModule {}
