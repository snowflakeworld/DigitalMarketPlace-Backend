import passport from 'passport';
import { ExtractJwt, Strategy as JwtStrategy } from 'passport-jwt';

import config from '@config';
import { getUserById } from '@services/user.service';

const opts = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: config.jwt.secret
};

export const getJwtStrategy = () => {
  return new JwtStrategy(opts, async (payload, done) => {
    try {
      const user = await getUserById(payload.id);
      return done(null, user ?? false);
    } catch (error) {
      return done(error, false);
    }
  });
};

const strategies = [{ name: 'jwt', strategyFcn: getJwtStrategy }];

export const getPassport = () => {
  for (const { name, strategyFcn } of strategies) {
    passport.use(name, strategyFcn());
  }

  return passport;
};
