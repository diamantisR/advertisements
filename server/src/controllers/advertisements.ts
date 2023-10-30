import { RequestHandler } from 'express';
import createHttpError from 'http-errors';
import mongoose from 'mongoose';
import AdvertisementModel from '../models/advertisement';

export const getAdvertisements: RequestHandler = async (req, res, next) => {
  try {
    const advertisements = await AdvertisementModel.find({})
      .sort({ createdAt: -1 })
      .exec();
    res.status(200).json(advertisements);
  } catch (error) {
    next(error);
  }
};

export const getAdvertisement: RequestHandler = async (req, res, next) => {
  const advertisementId = req.params.advertisementId;

  try {
    if (!mongoose.isValidObjectId(advertisementId)) {
      throw createHttpError(400, 'Invalid advertisement id');
    }

    const advertisement = await AdvertisementModel.findById(
      advertisementId
    ).exec();

    if (!advertisement) {
      throw createHttpError(404, 'Advertisement not found');
    }

    res.status(200).json(advertisement);
  } catch (error) {
    next(error);
  }
};

interface CreateAdvertisementBody {
  title?: string;
  type?: string;
  area?: string;
  description?: string;
  price?: number;
  file?: string;
  activated?: boolean;
}

export const createAdvertisement: RequestHandler<
  unknown,
  unknown,
  CreateAdvertisementBody,
  unknown
> = async (req, res, next) => {
  const title = req.body.title;
  const type = req.body.type;
  const area = req.body.area;
  const description = req.body.description;
  const price = req.body.price;
  const file = req.body.file;
  const activated = true;

  try {
    if (!title) {
      throw createHttpError(400, 'Advertisement must have a title');
    }

    const newAdvertisement = await AdvertisementModel.create({
      title,
      type,
      area,
      description,
      price,
      file,
      activated
    });

    res.status(201).json(newAdvertisement);
  } catch (error) {
    next(error);
  }
};

interface UpdateAdvertisementParams {
  advertisementId: string;
}

interface UpdateAdvertisementBody {
  title: string;
  type: string;
  area: string;
  description: string;
  price: number;
  file: string;
  activated: boolean;
}

export const updateAdvertisement: RequestHandler<
  UpdateAdvertisementParams,
  unknown,
  UpdateAdvertisementBody,
  unknown
> = async (req, res, next) => {
  const advertisementId = req.params.advertisementId;
  const newTitle = req.body.title;
  const newType = req.body.type;
  const newArea = req.body.area;
  const newDescription = req.body.description;
  const newPrice = req.body.price;
  const newFile = req.body.file;
  const newActivated = req.body.activated;

  try {
    if (!mongoose.isValidObjectId(advertisementId)) {
      throw createHttpError(400, 'Invalid advertisement id');
    }

    const advertisement = await AdvertisementModel.findById(
      advertisementId
    ).exec();

    if (!advertisement) {
      throw createHttpError(404, 'Advertisement not found');
    }

    advertisement.title = newTitle;
    advertisement.type = newType;
    advertisement.area = newArea;
    advertisement.description = newDescription;
    advertisement.file = newFile;
    advertisement.price = newPrice;
    advertisement.activated = newActivated;

    const updatedAdvertisement = await advertisement.save();

    res.status(200).json(updatedAdvertisement);
  } catch (error) {
    next(error);
  }
};

export const deleteAdvertisement: RequestHandler = async (req, res, next) => {
  const advertisementId = req.params.advertisementId;
  try {
    if (!mongoose.isValidObjectId(advertisementId)) {
      throw createHttpError(400, 'Invalid advertisement id');
    }

    const advertisement = await AdvertisementModel.findById(
      advertisementId
    ).exec();

    if (!advertisement) {
      throw createHttpError(404, 'Advertisement not found');
    }

    await advertisement.deleteOne();

    res.sendStatus(204);
  } catch (error) {
    next(error);
  }
};
