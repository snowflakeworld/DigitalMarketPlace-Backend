import { ISetting, ISettingDocument, SettingModel } from '@models';

export const createSetting = async (key: string, value: string): Promise<ISettingDocument> => {
  const settingDoc = new SettingModel({ key, value });
  return await settingDoc.save();
};

export const getSettingById = async (key: string): Promise<ISetting | null> => {
  return await SettingModel.findOne({ key }).lean();
};

export const updateSetting = async (key: string, value: string): Promise<ISetting | null> => {
  return await SettingModel.findOneAndUpdate({ key }, { $set: { value } }, { new: true }).lean();
};
