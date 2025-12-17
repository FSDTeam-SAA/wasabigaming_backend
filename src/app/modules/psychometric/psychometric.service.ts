import AppError from '../../error/appError';
import pagination, { IOption } from '../../helper/pagenation';
import User from '../user/user.model';
import { IPsychometric } from './psychometric.interface';
import Psychometric from './psychometric.model';

const createPsychometric = async (userId: string, payload: IPsychometric) => {
  const user = await User.findById(userId);
  if (!user) throw new AppError(404, 'User is not defiend');
  const result = await Psychometric.create({ ...payload, createdBy: user._id });
  if (!result) throw new AppError(404, 'User is not defiend');
  return result;
};

const getAllPsychometric = async (params: any, options: IOption) => {
  const { page, limit, skip, sortBy, sortOrder } = pagination(options);
  const { searchTerm, year, ...filterData } = params;

  const andCondition: any[] = [];
  const userSearchableFields = [
    'title',
    'description',
    'type',
    'questions.difficulty',
  ];

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

  const result = await Psychometric.find(whereCondition)
    .skip(skip)
    .limit(limit)
    .sort({ [sortBy]: sortOrder } as any);

  if (!result) {
    throw new AppError(404, 'Course not found');
  }

  const total = await Psychometric.countDocuments(whereCondition);

  return {
    data: result,
    meta: {
      total,
      page,
      limit,
    },
  };
};

const getPsychometricById = async (id: string) => {
  const result = await Psychometric.findById(id);
  if (!result) throw new AppError(404, 'User is not defiend');
  return result;
};

const updatePsychometric = async (id: string, payload: IPsychometric) => {
  const result = await Psychometric.findByIdAndUpdate(id, payload, {
    new: true,
    runValidators: true,
  });
  if (!result) throw new AppError(404, 'User is not defiend');
  return result;
};

const deletePsychometric = async (id: string) => {
  const result = await Psychometric.findByIdAndDelete(id);
  if (!result) throw new AppError(404, 'User is not defiend');
  return result;
};

export const psychometricService = {
  createPsychometric,
  getAllPsychometric,
  getPsychometricById,
  updatePsychometric,
  deletePsychometric,
};
