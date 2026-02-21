import mongoose from 'mongoose';

import config from '@config';

export const initMongoDB = async () => {
  try {
    console.debug(`Connecting ${config.mongodbURL}`);
    await mongoose.connect(config.mongodbURL);
    console.info('Database connected successfully');
  } catch (error) {
    const msg = (error as Error).message;
    throw new Error(msg);
  }
};
