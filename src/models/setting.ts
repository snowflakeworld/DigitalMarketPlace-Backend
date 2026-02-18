import { Document, model, Schema } from 'mongoose';

import { Entity } from '@types';

export interface ISetting extends Entity {
  key: string;
  value: string;
}

export type ISettingDocument = ISetting & Document;

const ModelSchema = new Schema<ISettingDocument>(
  {
    key: { type: String, required: true },
    value: { type: String, required: true }
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

export const SettingModel = model<ISettingDocument>('setting', ModelSchema);
