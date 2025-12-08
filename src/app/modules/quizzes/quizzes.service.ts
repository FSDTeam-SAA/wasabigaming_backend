import AppError from '../../error/appError';
import { fileUploader } from '../../helper/fileUploder';
import pagination, { IOption } from '../../helper/pagenation';
import User from '../user/user.model';
import { IQuizzes } from './quizzes.interface';
import Quizzes from './quizzes.model';

const createQuizzes = async (
  userId: string,
  payload: IQuizzes,
  file?: Express.Multer.File,
) => {
  const user = await User.findById(userId);
  if (!user) {
    throw new AppError(404, 'User not found');
  }
  if (file) {
    const quizzesImage = await fileUploader.uploadToCloudinary(file);
    payload.questions = quizzesImage?.url;
  }
  const quizzes = await Quizzes.create({ ...payload, createBy: user._id });
  return quizzes;
};

const getAllquizzes = async (params: any, options: IOption) => {
  const { page, limit, skip, sortBy, sortOrder } = pagination(options);
  const { searchTerm, year, ...filterData } = params;

  const andCondition: any[] = [];
  const userSearchableFields = ['title', 'status'];

  if (searchTerm) {
    andCondition.push({
      $or: userSearchableFields.map((field) => ({
        [field]: { $regex: searchTerm, $options: 'i' },
      })),
    });
  }

  if (Object.keys(filterData).length) {
    andCondition.push({
      $and: Object.entries(filterData).map(([field, value]) => ({
        [field]: value,
      })),
    });
  }

  // YEAR Filter → createdAt
  if (year) {
    const startDate = new Date(`${year}-01-01T00:00:00.000Z`);
    const endDate = new Date(`${year}-12-31T23:59:59.999Z`);

    andCondition.push({
      createdAt: {
        $gte: startDate,
        $lte: endDate,
      },
    });
  }

  const whereCondition = andCondition.length > 0 ? { $and: andCondition } : {};

  const result = await Quizzes.find(whereCondition)
    .skip(skip)
    .limit(limit)
    .sort({ [sortBy]: sortOrder } as any);

  if (!result) {
    throw new AppError(404, 'Quizzes not found');
  }

  const total = await Quizzes.countDocuments(whereCondition);

  return {
    data: result,
    meta: {
      total,
      page,
      limit,
    },
  };
};

const getSingleQuizzes = async (id: string) => {
  const result = await Quizzes.findById(id);
  if (!result) {
    throw new AppError(404, 'Quizzes not found');
  }
  return result;
};

const uploadQuizzes = async (
  userId: string,
  id: string,
  payload: Partial<IQuizzes>,
  file?: Express.Multer.File,
) => {
  const user = await User.findById(userId);
  if (!user) {
    throw new AppError(400, 'User not found');
  }
  const quizzes = await Quizzes.findById(id);
  if (!quizzes) {
    throw new AppError(400, 'quizzes not found');
  }

  if (user.role !== 'admin') {
    if (quizzes?.createBy?.toString() !== user._id.toString()) {
      throw new AppError(400, 'You are not authorized to update this quizzes');
    }
  }

  if (file) {
    const courseVideos = await fileUploader.uploadToCloudinary(file);
    payload.questions = courseVideos.url;
  }
  const result = await Quizzes.findByIdAndUpdate(
    id,
    { ...payload, createdBy: user._id },
    { new: true },
  );
  return result;
};

const deleteQuizzes = async (userId: string, id: string) => {
  const user = await User.findById(userId);
  if (!user) {
    throw new AppError(400, 'User not found');
  }
  const quizzes = await Quizzes.findById(id);
  if (!quizzes) {
    throw new AppError(400, 'quizzes not found');
  }

  if (user.role !== 'admin') {
    if (quizzes?.createBy?.toString() !== user._id.toString()) {
      throw new AppError(400, 'You are not authorized to delete this quizzes');
    }
  }

  const result = await Quizzes.findByIdAndDelete(id);
  return result;
};

export const quizzesService = {
  createQuizzes,
  getAllquizzes,
  getSingleQuizzes,
  uploadQuizzes,
  deleteQuizzes,
};
