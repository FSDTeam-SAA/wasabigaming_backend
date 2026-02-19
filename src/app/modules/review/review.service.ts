import AppError from '../../error/appError';
import pagination, { IOption } from '../../helper/pagenation';
import Course from '../course/course.model';
import User from '../user/user.model';
import { IReview } from './review.interface';
import Review from './review.model';

const createReview = async (userId: string, payload: IReview) => {
  const user = await User.findById(userId);
  if (!user) throw new AppError(404, 'User not found');
  const course = await Course.findById(payload.courseId);
  if (!course) throw new AppError(404, 'Course not found');
  const result = await Review.create({ ...payload, userID: user._id });

  await course.updateOne({ $push: { reviews: result._id } });
  return result;
};

const getAllReview = async (params: any, options: IOption) => {
  const { page, limit, skip, sortBy, sortOrder } = pagination(options);
  const { searchTerm, ...filterData } = params;
  const andConditions: any[] = [];

  const searchableFields = ['comment'];

  if (searchTerm) {
    andConditions.push({
      $or: searchableFields.map((field) => ({
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

  const result = await Review.find(whereConditions)
    .sort({ [sortBy]: sortOrder } as any)
    .skip(skip)
    .limit(limit);
  const total = await Review.countDocuments(whereConditions);
  return {
    meta: {
      page,
      limit,
      total,
    },
    data: result,
  };
};
const getMyAllReview = async (
  userId: string,
  params: any,
  options: IOption,
) => {
  const { page, limit, skip, sortBy, sortOrder } = pagination(options);
  const { searchTerm, ...filterData } = params;
  const andConditions: any[] = [];

  const searchableFields = ['comment'];

  if (searchTerm) {
    andConditions.push({
      $or: searchableFields.map((field) => ({
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

  andConditions.push({ userId: userId });

  const whereConditions =
    andConditions.length > 0 ? { $and: andConditions } : {};

  const result = await Review.find(whereConditions)
    .sort({ [sortBy]: sortOrder } as any)
    .skip(skip)
    .limit(limit);
  const total = await Review.countDocuments(whereConditions);
  return {
    meta: {
      page,
      limit,
      total,
    },
    data: result,
  };
};

const getSingleReview = async (id: string) => {
  const result = await Review.findById(id);
  return result;
};

const updateReview = async (userId: string, id: string, payload: IReview) => {
  const user = await User.findById(userId);
  if (!user) throw new AppError(404, 'User not found');
  const review = await Review.findById(id);
  if (!review) throw new AppError(404, 'Review not found');

  if (user.role !== 'admin') {
    if (review.userId.toString() !== userId) {
      throw new AppError(400, 'You are not authorized to update this review');
    }
  }

  const result = await Review.findOneAndUpdate({ _id: id }, payload, {
    new: true,
  });
  return result;
};

const deleteReview = async (userId: string, id: string) => {
  const user = await User.findById(userId);
  if (!user) throw new AppError(404, 'User not found');
  const review = await Review.findById(id);
  if (!review) throw new AppError(404, 'Review not found');

  if (user.role !== 'admin') {
    if (review.userId.toString() !== userId) {
      throw new AppError(400, 'You are not authorized to delete this review');
    }
  }

  const course = await Course.findById(review.courseId);
  if (!course) throw new AppError(404, 'Course not found');
  await course.updateOne({ $pull: { reviews: id } });

  const result = await Review.findByIdAndDelete(id);
  return result;
};

export const reviewService = {
  createReview,
  getAllReview,
  getSingleReview,
  updateReview,
  deleteReview,
  getMyAllReview,
};
