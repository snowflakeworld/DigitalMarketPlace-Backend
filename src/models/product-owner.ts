import { Document, model, Schema, Types } from 'mongoose';

import { Entity } from '@types';

export interface IProductOwner extends Entity {
  productObjectId: Types.ObjectId;
  address: string;
  ownerCount: number;
}

export type IProductOwnerDocument = IProductOwner & Document;

const ModelSchema = new Schema<IProductOwnerDocument>({
  productObjectId: { type: Schema.Types.ObjectId, required: true, ref: 'products' },
  address: { type: String, required: true },
  ownerCount: { type: Number, required: true, default: 1 }
});

export const ProductOwnerModel = model<IProductOwnerDocument>('product_owners', ModelSchema);
