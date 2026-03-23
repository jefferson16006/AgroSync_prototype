import { Injectable } from '@nestjs/common';

@Injectable()
export class AiService {
  async uploadFile(file: Express.Multer.File) {
    const response = {
      fileName: file.filename,
      filePath: file.path,
      fileSize: file.size
    }
    
    return { status: "Success", response };
  }
}
