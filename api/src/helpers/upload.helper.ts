import { diskStorage } from 'multer';
import { join } from 'path';

export class storageConfig {
  static storage = diskStorage({
    destination: join(__dirname, '../../../', 'public/streams'),
    filename: (req, file, cb) => {
      console.log(__dirname);
      return cb(null, `${Date.now()}-${file.originalname.replace(/ /g, '')}`);
    },
  });
}
