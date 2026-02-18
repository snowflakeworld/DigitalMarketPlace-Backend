import { Entity } from '@types';
import { Document, model, Schema, Types } from 'mongoose';

export interface IProductOwner extends Entity {
  productId: Types.ObjectId;
  address: string;
  ownerCount: number;
}

export type IProductOwnerDocument = IProductOwner & Document;

const ModelSchema = new Schema<IProductOwnerDocument>({
  productId: { type: Schema.Types.ObjectId, required: true, ref: 'product' },
  address: { type: String, required: true },
  ownerCount: { type: Number, required: true, default: 1 }
});

export const ProductOwnerModel = model<IProductOwnerDocument>('product_owner', ModelSchema);
