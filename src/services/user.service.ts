import { IUser, IUserDocument, UserModel } from '@models';
import { Types } from 'mongoose';

export const createUser = async (
  email: string,
  password: string,
  name: string,
  role: string
): Promise<IUserDocument> => {
  const userDoc = new UserModel({ email, password, name, role });
  return (await userDoc.save()).toObject();
};

export const getUserById = async (id: Types.ObjectId | string): Promise<IUser | null> => {
  return await UserModel.findById(id).lean();
};

export const getUserByEmail = async (email: string): Promise<IUser | null> => {
  return await UserModel.findOne({ email }).lean();
};
