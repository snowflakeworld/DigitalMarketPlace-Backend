import { Document, model, Schema } from 'mongoose';

import { Entity, UserRole } from '@types';

export interface IUser extends Entity {
  email: string;
  password: string;
  role: UserRole;
  name: string;
}

export type IUserDocument = IUser & Document;

const ModelSchema = new Schema<IUserDocument>(
  {
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    role: {
      type: String,
      required: true,
      enum: ['user', 'admin'],
      default: 'user'
    },
    name: { type: String, required: true }
  },
  {
    timestamps: true,
    toObject: {
      getters: true,
      virtuals: false,
      versionKey: false,
    },
    toJSON: {
      virtuals: false,
      versionKey: false,
      transform: function (_, ret) {
        delete ret.password;
        return ret;
      }
    }
  }
);

export const UserModel = model<IUserDocument>('users', ModelSchema);
