import multer from 'multer';
import path from 'path';

import configs from '@config';

const baseDir: string = process.cwd();
// const baseDir: string = 'C:/xampp/htdocs/digitalmarket';

// store uploaded files in media folder
const storage = multer.diskStorage({
  destination: (_, __, cb) => {
    cb(null, path.join(baseDir, `./${configs.media.bucket}`));
  },
  filename: (_, file, cb) => {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
    cb(null, uniqueSuffix + '-' + file.originalname);
  }
});

export const uploadImage = multer({ storage, limits: { fileSize: 5 * 1024 * 1024 } });
