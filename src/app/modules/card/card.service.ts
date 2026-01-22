import AppError from '../../error/appError';
import { fileUploader } from '../../helper/fileUploder';
import pagination, { IOption } from '../../helper/pagenation';
import User from '../user/user.model';
import { ICard } from './card.interface';
import Card from './card.model';

const createCard = async (
  userId: string,
  payload: ICard,
  file?: Express.Multer.File,
) => {
  const user = await User.findById(userId);
  if (!user) throw new AppError(404, 'user is not found');

  if (file) {
    const fileUploadImage = await fileUploader.uploadToCloudinary(file);
    payload.image = fileUploadImage.url;
  }

  const result = await Card.create({ ...payload, createdBy: userId });
  return result;
};

const getAllCard = async (params: any, options: IOption) => {
  const { page, limit, skip, sortBy, sortOrder } = pagination(options);
  const { searchTerm, ...filterData } = params;

  const andConditions = [];

  const searchableFild = ['title', 'subtitle', 'description'];

  if (searchTerm) {
    andConditions.push({
      $or: searchableFild.map((field) => ({
        [field]: {
          $regex: searchTerm,
          $options: 'i',
        },
      })),
    });
  }

  if (Object.keys(filterData).length > 0) {
    andConditions.push({
      $and: Object.entries(filterData).map(([key, value]) => ({
        [key]: value,
      })),
    });
  }
  const whereConditions =
    andConditions.length > 0 ? { $and: andConditions } : {};

  const result = await Card.find(whereConditions)
    .populate('createdBy', 'firstName email profileImage')
    .sort({ [sortBy]: sortOrder } as any)
    .skip(skip)
    .limit(limit);

  const total = await Card.countDocuments(whereConditions);

  return {
    data: result,
    meta: {
      page,
      limit,
      total,
    },
  };
};

const getSingleCard = async (id: string) => {
  const result = await Card.findById(id).populate(
    'createdBy',
    'firstName email profileImage',
  );
  if (!result) throw new AppError(404, 'Card is not found');

  return result;
};

const updateCard = async (
  id: string,
  payload: Partial<ICard>,
  file?: Express.Multer.File,
) => {
  const card = await Card.findById(id);
  if (!card) throw new AppError(404, 'Card is not found');

  if (file) {
    const fileUploadImage = await fileUploader.uploadToCloudinary(file);
    payload.image = fileUploadImage.url;
  }
  const result = await Card.findByIdAndUpdate(id, payload, {
    new: true,
  });
  if (!result) throw new AppError(404, 'Card is not found');

  return result;
};

const deleteCard = async (id: string) => {
  const result = await Card.findByIdAndDelete({ _id: id });
  if (!result) throw new AppError(404, 'Card is not found');

  return result;
};

export const cardService = {
  createCard,
  getAllCard,
  getSingleCard,
  updateCard,
  deleteCard,
};
