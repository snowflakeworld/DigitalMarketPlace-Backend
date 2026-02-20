import { Document, model, Schema, Types } from 'mongoose';

import { Entity, EventType } from '@types';

export interface IProductEvent extends Entity {
  productObjectId: Types.ObjectId;
  type: EventType;
  fromAddress: string;
  toAddress: string;
}

export type IProductEventDocument = IProductEvent & Document;

const ModelSchema = new Schema<IProductEventDocument>({
  productObjectId: { type: Schema.Types.ObjectId, required: true, ref: 'products' },
  type: {
    type: String,
    required: true,
    enum: ['list', 'purchase', 'transfer']
  },
  fromAddress: { type: String, required: true },
  toAddress: { type: String }
});

export const ProductEventModel = model<IProductEventDocument>('product_events', ModelSchema);
