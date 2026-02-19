import { Response } from 'express';
import httpStatus from 'http-status';

import { AuthRequest } from '@middlewares';
import { SettingModel } from '@models';
import { createSetting, updateSetting } from '@services/setting.service';
import { ApiError, catchAsync } from '@utils';

export const getSetting = catchAsync(async (_: AuthRequest, res: Response) => {
  try {
    const data = await SettingModel.find().lean();

    return res.send(data);
  } catch (error) {
    console.error('Error during signin:', error.message);
    if (error instanceof ApiError) {
      return res.status(error.statusCode).json(error.message);
    } else {
      return res.status(httpStatus.INTERNAL_SERVER_ERROR).json('Unexpected error occurred');
    }
  }
});

export const addSetting = catchAsync(async (req: AuthRequest, res: Response) => {
  try {
    const { key, value } = req.body;

    const savedSetting = await createSetting(key, value);

    return res.send(savedSetting);
  } catch (error) {
    console.error('Error during signin:', error.message);
    if (error instanceof ApiError) {
      return res.status(error.statusCode).json(error.message);
    } else {
      return res.status(httpStatus.INTERNAL_SERVER_ERROR).json('Unexpected error occurred');
    }
  }
});

export const modifySetting = catchAsync(async (req: AuthRequest, res: Response) => {
  try {
    const { key } = req.params;
    const { value } = req.body;

    const savedSetting = await updateSetting(key, value);

    return res.send(savedSetting);
  } catch (error) {
    console.error('Error during signin:', error.message);
    if (error instanceof ApiError) {
      return res.status(error.statusCode).json(error.message);
    } else {
      return res.status(httpStatus.INTERNAL_SERVER_ERROR).json('Unexpected error occurred');
    }
  }
});
