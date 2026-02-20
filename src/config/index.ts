import dotenv from 'dotenv';
import Joi from 'joi';
import path from 'path';

dotenv.config({ path: path.join(__dirname, '../../.env') });

const envVarsSchema = Joi.object()
  .keys({
    NODE_ENV: Joi.string().valid('production', 'development', 'test').required(),
    DOMAIN: Joi.string().default('http://127.0.0.1').required(),
    PORT: Joi.number().default(8282).description('Server port'),

    DATABASE_URL: Joi.string().required().description('MongoDB Connection URL'),

    JWT_SECRET: Joi.string().required().description('JWT secret key'),
    JWT_LIFETIME: Joi.string().required().default('1h').description('JWT Lifetime'),

    PINATA_JWT_SECRET: Joi.string().required().description('Pinata JWT secret key'),

    MEDIA_BUCKET: Joi.string().required().description('MEDIA BUCKET')
  })
  .unknown();

const { value: envVars, error } = envVarsSchema.prefs({ errors: { label: 'key' } }).validate(process.env);

if (error) {
  throw new Error(`Config validation error: ${error.message}`);
}

export default {
  env: envVars.NODE_ENV,
  domain: envVars.DOMAIN,
  port: envVars.PORT,

  mongodbURL: envVars.DATABASE_URL,

  jwt: {
    secret: envVars.JWT_SECRET,
    lifetime: envVars.JWT_LIFETIME
  },

  pinata: {
    jwt: envVars.PINATA_JWT_SECRET
  },

  media: {
    bucket: envVars.MEDIA_BUCKET,
    formats: ['image/jpeg', 'image/jpg', 'image/png', 'image/webp']
  }
};
