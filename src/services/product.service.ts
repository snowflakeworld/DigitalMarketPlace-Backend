import { PipelineStage, Types } from 'mongoose';

import {
  IProduct,
  IProductAddress,
  IProductDocument,
  IProductOwner,
  IProductOwnerDocument,
  ProductModel,
  ProductOwnerModel
} from '@models';
import { IProductEventDocument, ProductEventModel } from '@models/product-event';
import { EventType, GetList } from '@types';

export const createProduct = async (
  name: string,
  description: string,
  image: string,
  price: string,
  ipfsHash: string,
  productId: number,
  status: boolean = true
): Promise<IProductDocument> => {
  const productDoc = new ProductModel({ name, description, image, price, ipfsHash, productId, status });
  return (await productDoc.save()).toObject();
};

export const createProductOwner = async (
  productObjectId: Types.ObjectId | string,
  address: string,
  ownerCount: number = 1
): Promise<IProductOwnerDocument> => {
  const ownerDoc = new ProductOwnerModel({ productObjectId, address, ownerCount });
  return await ownerDoc.save();
};

export const createProductEvent = async (
  productObjectId: Types.ObjectId | string,
  type: EventType,
  fromAddress: string,
  toAddress?: string
): Promise<IProductEventDocument> => {
  const eventDoc = new ProductEventModel({ productObjectId, type, fromAddress, ...(toAddress ? { toAddress } : {}) });
  return await eventDoc.save();
};

export const getProductById = async (id: Types.ObjectId | string): Promise<IProduct | null> => {
  return await ProductModel.findById(id).lean();
};

export const getProductByProductId = async (id: number): Promise<IProduct | null> => {
  return await ProductModel.findOne({ productId: id }).lean();
};

export const getUserByName = async (name: string): Promise<IProduct | null> => {
  return await ProductModel.findOne({ name }).lean();
};

export const updateProductOwner = async (
  productObjectId: Types.ObjectId | string,
  address: string
): Promise<IProductOwner | null> => {
  return await ProductOwnerModel.findOneAndUpdate({ productObjectId }, { $set: { address }, $inc: { ownerCount: 1 } });
};

export const getProductList = async ({
  page,
  limit,
  filters
}: GetList<IProductAddress & { search?: string }>): Promise<{
  data: IProductAddress[];
  total: number;
  totalPages: number;
}> => {
  const skip = (page - 1) * limit;

  const query = { ...filters };
  if (filters.search) {
    query.name = new RegExp(filters.search, 'i');
    delete query.search;
  }

  const pipeline: PipelineStage[] = [
    {
      $lookup: {
        from: 'product_owners',
        localField: '_id',
        foreignField: 'productObjectId',
        as: 'productOwners'
      }
    },
    {
      $unwind: { path: '$productOwners' }
    },
    {
      $project: {
        _id: 1,
        name: 1,
        description: 1,
        image: 1,
        price: 1,
        ipfsHash: 1,
        productId: 1,
        status: 1,
        createdAt: 1,
        updatedAt: 1,
        address: '$productOwners.address',
        ownerCount: '$productOwners.ownerCount'
      }
    },
    { $match: query },
    {
      $sort: { createdAt: -1 }
    },
    {
      $skip: skip
    },
    {
      $limit: limit
    }
  ];

  const [data, total] = await Promise.all([
    ProductModel.aggregate(pipeline).exec(),
    ProductOwnerModel.countDocuments(query)
  ]);

  return { data, total, totalPages: Math.ceil(total / limit) };
};
