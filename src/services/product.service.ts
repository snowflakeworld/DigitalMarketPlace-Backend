import {
  IProduct,
  IProductDocument,
  IProductOwner,
  IProductOwnerDocument,
  ProductModel,
  ProductOwnerModel
} from '@models';
import { IProductEventDocument, ProductEventModel } from '@models/product-event';
import { EventType } from '@types';
import { Types } from 'mongoose';

export const createProduct = async (
  name: string,
  description: string,
  image: string,
  price: number,
  ipfsHash: string,
  status: boolean = true
): Promise<IProductDocument> => {
  const productDoc = new ProductModel({ name, description, image, price, ipfsHash, status });
  return (await productDoc.save()).toObject();
};

export const createProductOwner = async (
  productId: Types.ObjectId | string,
  address: string,
  ownerCount: number = 1
): Promise<IProductOwnerDocument> => {
  const ownerDoc = new ProductOwnerModel({ productId, address, ownerCount });
  return (await ownerDoc.save()).toObject();
};

export const createProductEvent = async (
  productId: Types.ObjectId | string,
  type: EventType,
  fromAddress: string,
  toAddress?: string
): Promise<IProductEventDocument> => {
  const eventDoc = new ProductEventModel({ productId, type, fromAddress, ...(toAddress ? { toAddress } : {}) });
  return (await eventDoc.save()).toObject();
};

export const getProductById = async (id: Types.ObjectId | string): Promise<IProduct | null> => {
  return await ProductModel.findById(id).lean();
};

export const getUserByName = async (name: string): Promise<IProduct | null> => {
  return await ProductModel.findOne({ name }).lean();
};

export const updateProductOwner = async (
  productId: Types.ObjectId | string,
  address: string
): Promise<IProductOwner | null> => {
  return await ProductOwnerModel.findOneAndUpdate({ productId }, { $set: { address }, $inc: { ownerCount: 1 } });
};
