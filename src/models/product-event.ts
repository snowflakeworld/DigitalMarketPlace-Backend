import { Entity, EventType } from '@types';
import { Document, model, Schema, Types } from 'mongoose';

export interface IProductEvent extends Entity {
  productId: Types.ObjectId;
  type: EventType;
  fromAddress: string;
  toAddress: string;
}

export type IProductEventDocument = IProductEvent & Document;

const ModelSchema = new Schema<IProductEventDocument>({
  productId: { type: Schema.Types.ObjectId, required: true, ref: 'product' },
  type: {
    type: String,
    required: true,
    enum: ['list', 'purchase', 'transfer']
  },
  fromAddress: { type: String, required: true },
  toAddress: { type: String }
});

export const ProductEventModel = model<IProductEventDocument>('product_event', ModelSchema);
