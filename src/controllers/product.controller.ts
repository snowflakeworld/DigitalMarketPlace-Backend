import { Request, Response } from 'express';
import httpStatus from 'http-status';

import { AuthRequest } from '@middlewares';
import { createUser, getUserByEmail } from '@services/user.service';
import { ApiError, catchAsync } from '@utils';

export const getProducts = catchAsync(async (req: AuthRequest, res: Response) => {
  try {
    return res.send({});
  } catch (error) {
    console.error('Error during signin:', error.message);
    if (error instanceof ApiError) {
      return res.status(error.statusCode).json(error.message);
    } else {
      return res.status(httpStatus.INTERNAL_SERVER_ERROR).json('Unexpected error occurred');
    }
  }
});

export const listProduct = catchAsync(async (req: AuthRequest, res: Response) => {
  try {
    return res.send({});
  } catch (error) {
    console.error('Error during signin:', error.message);
    if (error instanceof ApiError) {
      return res.status(error.statusCode).json(error.message);
    } else {
      return res.status(httpStatus.INTERNAL_SERVER_ERROR).json('Unexpected error occurred');
    }
  }
});

export const purchaseProduct = catchAsync(async (req: AuthRequest, res: Response) => {
  try {
    return res.send({});
  } catch (error) {
    console.error('Error during signin:', error.message);
    if (error instanceof ApiError) {
      return res.status(error.statusCode).json(error.message);
    } else {
      return res.status(httpStatus.INTERNAL_SERVER_ERROR).json('Unexpected error occurred');
    }
  }
});

export const transferOwnership = catchAsync(async (req: AuthRequest, res: Response) => {
  try {
    return res.send({});
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
