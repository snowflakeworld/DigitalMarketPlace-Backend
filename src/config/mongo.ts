import mongoose from 'mongoose';

import config from '@config';

export const initMongoDB = async () => {
  try {
    await mongoose.connect(config.mongodbURL);
  } catch (error) {
    const msg = (error as Error).message;
    throw new Error(msg);
  }
};
