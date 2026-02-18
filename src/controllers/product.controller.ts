import { Request, Response } from 'express';
import httpStatus from 'http-status';

import { AuthRequest } from '@middlewares';
import { ProductModel } from '@models';
import { createProduct, createProductEvent, createProductOwner, updateProductOwner } from '@services/product.service';
import { createUser, getUserByEmail } from '@services/user.service';
import { ApiError, catchAsync } from '@utils';

export const getProducts = catchAsync(async (_: AuthRequest, res: Response) => {
  try {
    const data = await ProductModel.find({ status: true }).sort({ createdAt: -1 }).exec();

    return res.send(data);
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
    const { address, name, description, price, image, ipfsHash } = req.body;

    // Insert Product Item
    const savedProduct = await createProduct(name, description, image, price, ipfsHash);

    // Insert Product Owner
    await createProductOwner(savedProduct._id, address);

    // Insert Product Event
    await createProductEvent(savedProduct._id, 'list', address);

    return res.send(savedProduct);
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
    const { productId, address } = req.body;

    // Change Product Owner
    await updateProductOwner(productId, address);

    // Insert Product Event
    await createProductEvent(productId, 'purchase', address);

    return res.send({ success: true });
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
    const { productId, address } = req.body;

    // Change Product Owner
    const doc = await updateProductOwner(productId, address);

    // Insert Product Event
    await createProductEvent(productId, 'purchase', doc.address, address);

    return res.send({ success: true });
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
