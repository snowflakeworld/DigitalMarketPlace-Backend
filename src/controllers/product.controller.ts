import { Response } from 'express';
import fs from 'fs';
import httpStatus from 'http-status';

import { PinataSDK } from 'pinata';

import config from '@config';
import { AuthRequest } from '@middlewares';
import {
  createProduct,
  createProductEvent,
  createProductOwner,
  getProductByProductId,
  getProductList,
  updateProductOwner
} from '@services/product.service';
import { ApiError, catchAsync } from '@utils';

const pinata = new PinataSDK({ pinataJwt: config.pinata.jwt });

export const getProducts = catchAsync(async (req: AuthRequest, res: Response) => {
  try {
    const { page, limit, filters } = req.body;

    if (!page) {
      throw new ApiError(httpStatus.BAD_REQUEST, 'page is required');
    }

    if (!limit) {
      throw new ApiError(httpStatus.BAD_REQUEST, 'limit is required');
    }

    const { data, total, totalPages } = await getProductList({ page, limit, filters });

    return res.send({ data, total, totalPages });
  } catch (error) {
    console.error('Error during get products:', error.message);
    if (error instanceof ApiError) {
      return res.status(error.statusCode).json(error.message);
    } else {
      return res.status(httpStatus.INTERNAL_SERVER_ERROR).json('Unexpected error occurred');
    }
  }
});

export const listProduct = catchAsync(async (req: AuthRequest, res: Response) => {
  try {
    const { address, name, description, price, image, ipfsHash, productId } = req.body;

    // Find existing one
    const existProduct = await getProductByProductId(productId);
    if (existProduct) throw new ApiError(httpStatus.NOT_ACCEPTABLE, 'Cannot add an existing product');

    // Insert Product Item
    const savedProduct = await createProduct(name, description, image, price, ipfsHash, productId);

    // Insert Product Owner
    await createProductOwner(savedProduct._id, address);

    // Insert Product Event
    await createProductEvent(savedProduct._id, 'list', address);

    return res.send({ ...savedProduct, address });
  } catch (error) {
    console.error('Error during list a product:', error.message);
    if (error instanceof ApiError) {
      return res.status(error.statusCode).json(error.message);
    } else {
      return res.status(httpStatus.INTERNAL_SERVER_ERROR).json('Unexpected error occurred');
    }
  }
});

export const purchaseProduct = catchAsync(async (req: AuthRequest, res: Response) => {
  try {
    const { productObjectId, address } = req.body;

    // Change Product Owner
    await updateProductOwner(productObjectId, address);

    // Insert Product Event
    await createProductEvent(productObjectId, 'purchase', address);

    return res.send({ success: true });
  } catch (error) {
    console.error('Error during purchase a product:', error.message);
    if (error instanceof ApiError) {
      return res.status(error.statusCode).json(error.message);
    } else {
      return res.status(httpStatus.INTERNAL_SERVER_ERROR).json('Unexpected error occurred');
    }
  }
});

export const transferOwnership = catchAsync(async (req: AuthRequest, res: Response) => {
  try {
    const { productObjectId, address } = req.body;

    // Change Product Owner
    const doc = await updateProductOwner(productObjectId, address);

    // Insert Product Event
    await createProductEvent(productObjectId, 'transfer', doc.address, address);

    return res.send({ success: true });
  } catch (error) {
    console.error('Error during transfer ownership:', error.message);
    if (error instanceof ApiError) {
      return res.status(error.statusCode).json(error.message);
    } else {
      return res.status(httpStatus.INTERNAL_SERVER_ERROR).json('Unexpected error occurred');
    }
  }
});

export const uploadProductImage = catchAsync(async (req: AuthRequest, res: Response) => {
  try {
    if (!req.file) {
      throw new ApiError(httpStatus.BAD_REQUEST, 'No file uploaded');
    }
    console.log(req.file);
    const fileName = req.file.filename;
    const filePath = req.file.path;

    fs.chmodSync(filePath, 0o644);

    const fileData = fs.readFileSync(filePath);
    const file = new File([fileData], fileName, { type: req.file.mimetype });
    const upload = await pinata.upload.public.file(file);

    // Upload to Pinata

    return res.send({ url: fileName, ipfsHash: upload.cid });
  } catch (error) {
    console.error('Error during upload product image:', error.message);
    if (error instanceof ApiError) return res.status(error.statusCode).json(error.message);
    else return res.status(httpStatus.INTERNAL_SERVER_ERROR).json('Unexpected error occurred');
  }
});
