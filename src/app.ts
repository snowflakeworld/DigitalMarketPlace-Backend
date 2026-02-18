import compression from 'compression';
import cors from 'cors';
import express from 'express';
import http from 'http';
import path from 'path';

import configs from '@config';
import { initMongoDB } from '@config/mongo';
import { errorConverter, errorHandler } from '@middlewares/error';
import { getPassport } from 'utils/passport';
import routes from './routes';

export const passport = getPassport();

// init MongoDB & Redis & Passport
const init = async () => {
  await initMongoDB();
  passport.initialize();
};

init().catch((error) => {
  console.log(error);
});

const baseDir: string = process.cwd();

const app = express();

app.use(cors({ origin: '*' }));
app.use(compression());

app.use(express.json({ limit: '500mb' }));
app.use(express.urlencoded({ limit: '500mb', extended: true }));
app.use(express.static(path.join(baseDir, `./${configs.media.bucket}`)));

app.use(errorConverter);
app.use(errorHandler);

app.use('/api', routes);

const server = http.createServer(app);

export default server;
