import { Types } from 'mongoose';
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
  const result = await Review.create({ ...payload, userId: user._id });

  await course.updateOne({ $push: { reviews: result._id } });
  return result;
};

const getAllReview = async (params: any, options: IOption) => {
  const { page, limit, skip, sortBy, sortOrder } = pagination(options);
  const { searchTerm, rating, ratingMin, ratingMax, ...filterData } = params;

  const andConditions: any[] = [];

  const searchableFields = ['comment'];

  // search
  if (searchTerm) {
    andConditions.push({
      $or: searchableFields.map((field) => ({
        [field]: { $regex: searchTerm, $options: 'i' },
      })),
    });
  }

  // rating exact filter
  if (rating) {
    andConditions.push({
      rating: Number(rating),
    });
  }

  // rating range filter (VERY IMPORTANT)
  if (ratingMin || ratingMax) {
    const range: any = {};

    if (ratingMin) range.$gte = Number(ratingMin);
    if (ratingMax) range.$lte = Number(ratingMax);

    andConditions.push({
      rating: range,
    });
  }

  // other filters
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
    .sort({
      [sortBy || 'createdAt']: sortOrder === 'asc' ? 1 : -1,
    })
    .skip(skip)
    .limit(limit)
    .populate('userId')
    .populate('courseId');

  const total = await Review.countDocuments(whereConditions);

  return {
    meta: { page, limit, total },
    data: result,
  };
};

const getMyAllReview = async (
  userId: string,
  params: any,
  options: IOption,
) => {
  const { page, limit, skip, sortBy, sortOrder } = pagination(options);
  const { searchTerm, rating, ratingMin, ratingMax, ...filterData } = params;

  const andConditions: any[] = [];

  const searchableFields = ['comment'];

  if (searchTerm) {
    andConditions.push({
      $or: searchableFields.map((field) => ({
        [field]: { $regex: searchTerm, $options: 'i' },
      })),
    });
  }

  // rating filters
  if (rating) {
    andConditions.push({ rating: Number(rating) });
  }

  if (ratingMin || ratingMax) {
    const range: any = {};
    if (ratingMin) range.$gte = Number(ratingMin);
    if (ratingMax) range.$lte = Number(ratingMax);

    andConditions.push({ rating: range });
  }

  // VERY IMPORTANT FIX
  andConditions.push({
    userId: new Types.ObjectId(userId),
  });

  const whereConditions =
    andConditions.length > 0 ? { $and: andConditions } : {};

  const result = await Review.find(whereConditions)
    .sort({
      [sortBy || 'createdAt']: sortOrder === 'asc' ? 1 : -1,
    })
    .skip(skip)
    .limit(limit)
    .populate('userId')
    .populate('courseId');

  const total = await Review.countDocuments(whereConditions);

  return {
    meta: { page, limit, total },
    data: result,
  };
};

const getSingleReview = async (id: string) => {
  const result = await Review.findById(id)
    .populate('userId')
    .populate('courseId');
  return result;
};

const updateReview = async (userId: string, id: string, payload: IReview) => {
  const user = await User.findById(userId);
  if (!user) throw new AppError(404, 'User not found');
  const review = await Review.findById(id);
  if (!review) throw new AppError(404, 'Review not found');

  if (user.role !== 'admin') {
    if (review.userId.toString() !== user._id.toString()) {
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

const avarageRating = async (courseId: string) => {
  const result = await Review.aggregate([
    { $match: { courseId } },
    {
      $group: {
        _id: null,
        averageRating: { $avg: '$rating' },
      },
    },
  ]);
  return result;
};

const allAvarageRating = async () => {
  const result = await Review.aggregate([
    {
      $group: {
        _id: null,
        averageRating: { $avg: '$rating' },
      },
    },
  ]);
  return result;
};

export const reviewService = {
  createReview,
  getAllReview,
  getSingleReview,
  updateReview,
  deleteReview,
  getMyAllReview,
  allAvarageRating,
  avarageRating,
};
