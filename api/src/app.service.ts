import { BadRequestException, Injectable } from '@nestjs/common';
import { HttpRes } from './helpers/HttpRes.utils';

@Injectable()
export class AppService {
  uploadFile(file: Express.Multer.File) {
    try {
      const url = `${process.env.SERVER_NAME}/api/static/streams/${file.filename}`;
      const response = {
        ...file,
        url,
      };
      return HttpRes.success(response, 201);
    } catch (error) {
      throw new BadRequestException([error.message]);
    }
  }
}
