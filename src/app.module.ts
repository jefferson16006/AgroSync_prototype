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
import { PaymentsModule } from './payments/payments.module';


@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true
    }),
    MulterModule.register({
      storage: diskStorage({
        filename: fileNameEditor,
        destination: './uploads'
      }),
      dest: './uploads',
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
    PaymentsModule,
  ]
})
export class AppModule {}
