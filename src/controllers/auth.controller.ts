import { Request, Response } from 'express';
import httpStatus from 'http-status';
import jwt from 'jsonwebtoken';

import config from '@config';
import { createUser, getUserByEmail } from '@services/user.service';
import { ApiError, catchAsync } from '@utils';

export const signIn = catchAsync(async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;

    const user = await getUserByEmail(email);

    if (!user) {
      throw new ApiError(httpStatus.NOT_ACCEPTABLE, 'User does not exist');
    }

    if (password !== user.password) {
      throw new ApiError(httpStatus.BAD_REQUEST, 'Password is not correct');
    }

    const payload = {
      id: user._id,
      email: user.email
    };

    delete user.password;

    const token = jwt.sign(payload, config.jwt.secret, { expiresIn: config.jwt.lifetime });

    return res.send({ token, user });
  } catch (error) {
    console.error('Error during signin:', error.message);
    if (error instanceof ApiError) {
      return res.status(error.statusCode).json(error.message);
    } else {
      return res.status(httpStatus.INTERNAL_SERVER_ERROR).json('Unexpected error occurred');
    }
  }
});

export const signUp = catchAsync(async (req: Request, res: Response) => {
  try {
    const { email, password, name } = req.body;

    const user = await getUserByEmail(email);

    if (user) {
      throw new ApiError(httpStatus.CONFLICT, 'User already exists');
    }

    const savedUser = await createUser(email, password, name, 'user');

    delete savedUser.password;

    return res.send({ ...savedUser });
  } catch (error) {
    console.error('Error during signup:', error.message);
    if (error instanceof ApiError) {
      console.error(error.message);
      return res.status(error.statusCode).json(error.message);
    } else {
      return res.status(httpStatus.INTERNAL_SERVER_ERROR).json('Unexpected error occurred');
    }
  }
});
