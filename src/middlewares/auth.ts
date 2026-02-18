import { NextFunction, Request, Response } from 'express';
import httpStatus from 'http-status';
import passport from 'passport';

import { IUser } from '@models';

export interface AuthRequest extends Request {
  user?: IUser;
}

export const auth = async (req: AuthRequest, res: Response, next: NextFunction) => {
  return passport.authenticate('jwt', (err, user) => {
    if (err || !user) {
      return res.status(httpStatus.UNAUTHORIZED).json({ error: 'Unauthorized' });
    }
    req.user = user;
    return next();
  })(req, res, next);
};
