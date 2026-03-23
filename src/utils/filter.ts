import { BadRequestException } from "@nestjs/common";
import { v4 as uuidv4 } from 'uuid';
import { extname } from 'path';

export const fileNameEditor = (
  req: Express.Request,
  file: any,
  callback: (error: any, filename) => void
) => {
    const filename: string = uuidv4();
    const extension: string = extname(file.originalname);
    callback(null, `${filename}${extension}`);
}



export const imageFileFilter = (
  req: Express.Request,
  file: any,
  callback: (error: any, valid: boolean) => void,
) => {
  if (!file.originalname.match(/\.(jpg|jpeg|png|webp)$/)) {
    return callback(new BadRequestException('Only image files are allowed'), false);
  }

  const allowedMimeTypes = [
    'image/jpeg',
    'image/jpg',
    'image/png',
    'image/webp',
  ];

  if (!allowedMimeTypes.includes(file.mimetype)) {
    return callback(new Error('Invalid file type: only images are allowed'), false);
  }

  callback(null, true);
};