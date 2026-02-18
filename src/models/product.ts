import { Document, model, Schema } from 'mongoose';

import { Entity } from '@types';

export interface IProduct extends Entity {
  name: string;
  description: string;
  image: string;
  price: number;
  ipfsHash: string;
  status: boolean;
}

export type IProductDocument = IProduct & Document;

const ModelSchema = new Schema<IProductDocument>(
  {
    name: { type: String, required: true },
    description: { type: String, required: true },
    image: { type: String, required: true },
    price: { type: Number, required: true },
    ipfsHash: { type: String, required: true },
    status: { type: Boolean, required: true, default: true }
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

export const ProductModel = model<IProductDocument>('product', ModelSchema);
