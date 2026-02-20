import { Document, model, Schema } from 'mongoose';

import { Entity } from '@types';

export interface IProduct extends Entity {
  name: string | RegExp;
  description: string;
  image: string;
  price: string;
  ipfsHash: string;
  status: boolean;
  productId: number;
}

export type IProductDocument = IProduct & Document;

export type IProductAddress = IProduct & { address: string };

const ModelSchema = new Schema<IProductDocument>(
  {
    name: { type: String, required: true },
    description: { type: String, required: true },
    image: { type: String, required: true },
    price: { type: String, required: true },
    ipfsHash: { type: String, required: true },
    status: { type: Boolean, required: true, default: true },
    productId: { type: Number, required: true, unique: true }
  },
  {
    timestamps: true,
    toObject: {
      getters: true,
      virtuals: true,
      versionKey: false
    },
    toJSON: {
      virtuals: true,
      versionKey: false,
      transform: function (_, ret) {
        return ret;
      }
    }
  }
);

ModelSchema.index({ productId: 1 });

export const ProductModel = model<IProductDocument>('products', ModelSchema);
