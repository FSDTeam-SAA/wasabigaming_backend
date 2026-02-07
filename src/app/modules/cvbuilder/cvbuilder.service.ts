import axios from 'axios';
import AppError from '../../error/appError';
import pagination, { IOption } from '../../helper/pagenation';
import { userRole } from '../user/user.constant';
import User from '../user/user.model';
import { ICVbuilder } from './cvbuilder.interface';
import CVbuilder from './cvbuilder.model';
import {
  cvBuilderDescription,
  cvBuilderSummary,
} from '../../helper/aiEndpoint';
import Premium from '../premium/premium.model';

const createCVbuilder = async (userId: string, payload: ICVbuilder) => {
  const user = await User.findById(userId);
  if (!user) throw new AppError(400, 'User not found');

  const cvCount = await CVbuilder.countDocuments({ createBy: user._id });
  const subscription = await Premium.findById(user.subscription);
  if (!subscription) throw new AppError(404, 'subscription is not found');
  
  if (subscription.name === 'Free Plan') {
    if (cvCount >= 1) {
      throw new AppError(
        403,
        'Free plan users can create only one CV. Please upgrade your plan.',
      );
    }
  }

  const result = await CVbuilder.create({
    ...payload,
    createBy: user._id,
  });

  if (!result) throw new AppError(400, 'CVbuilder not created');
  const summaryText = await cvBuilderSummary(
    {
      firstName: result.firstName,
      lastName: result.lastName,
      profession: result.profession,
      email: result.email,
      phone: result.phone,
      location: result.location,
      legalWorkExperience: result.legalWorkExperience,
      nonLegalWorkExperience: result.nonLegalWorkExperience,
      educationLevel: result.educationLevel,
      leadership: result.leadership,
      achievements: result.achievements,
    },
    result.summary,
  );

  if (summaryText) {
    result.summary = summaryText;
  }
  await result.save();

  return result;
};

const getAllCVbuilder = async (
  userId: string,
  params: any,
  options: IOption,
) => {
  const user = await User.findById(userId);
  if (!user) throw new AppError(400, 'User not found');

  const { page, limit, skip, sortBy, sortOrder } = pagination(options);
  const { searchTerm, year, ...filterData } = params;

  const andCondition: any[] = [];
  const userSearchableFields = [
    'location',
    'phone',
    'email',
    'profession',
    'lastName',
    'firstName',
  ];

  // Search term filter
  if (searchTerm) {
    andCondition.push({
      $or: userSearchableFields.map((field) => ({
        [field]: { $regex: searchTerm, $options: 'i' },
      })),
    });
  }

  // Other filters
  if (Object.keys(filterData).length) {
    andCondition.push({
      $and: Object.entries(filterData).map(([field, value]) => ({
        [field]: value,
      })),
    });
  }

  // Year filter
  if (year) {
    const startDate = new Date(`${year}-01-01T00:00:00.000Z`);
    const endDate = new Date(`${year}-12-31T23:59:59.999Z`);
    andCondition.push({
      createdAt: { $gte: startDate, $lte: endDate },
    });
  }

  // Where condition
  let whereCondition: any =
    andCondition.length > 0 ? { $and: andCondition } : {};

  // Normal user → only their own CVs
  if (user.role !== userRole.admin) {
    whereCondition.createBy = user._id;
  }

  // Query database
  const result = await CVbuilder.find(whereCondition)
    .skip(skip)
    .limit(limit)
    .sort({ [sortBy]: sortOrder } as any);

  if (!result || result.length === 0) {
    throw new AppError(404, 'CVbuilder not found');
  }

  const total = await CVbuilder.countDocuments(whereCondition);

  return {
    data: result,
    meta: { total, page, limit },
  };
};

const getSingleCVbuilder = async (id: string) => {
  const result = await CVbuilder.findById(id);

  if (!result) throw new AppError(400, 'CVbuilder not found');
  return result;
};

const updateCVbuilder = async (
  userId: string,
  id: string,
  payload: Partial<ICVbuilder>,
) => {
  const user = await User.findById(userId);
  if (!user) {
    throw new AppError(400, 'User not found');
  }
  const cvbuilder = await CVbuilder.findById(id);
  if (!cvbuilder) {
    throw new AppError(400, 'cvbuilder not found');
  }

  if (user.role !== 'admin') {
    if (cvbuilder?.createBy?.toString() !== user._id.toString()) {
      throw new AppError(400, 'You are not authorized to update this course');
    }
  }

  const result = await CVbuilder.findByIdAndUpdate(id, payload, { new: true });
  return result;
};

const deleteCVbuilder = async (userId: string, id: string) => {
  const user = await User.findById(userId);
  if (!user) {
    throw new AppError(400, 'User not found');
  }
  const cvbuilder = await CVbuilder.findById(id);
  if (!cvbuilder) {
    throw new AppError(400, 'cvbuilder not found');
  }

  if (user.role !== 'admin') {
    if (cvbuilder?.createBy?.toString() !== user._id.toString()) {
      throw new AppError(400, 'You are not authorized to update this course');
    }
  }

  const result = await CVbuilder.findByIdAndDelete(id);
  return result;
};

const leaderShip = async (payload: any) => {
  if (Array.isArray(payload.leadership) && payload.leadership.length > 0) {
    const enhancedLeadership = await Promise.all(
      payload.leadership.map(async (item: any) => {
        if (!item.description) return item;
        const aiText = await cvBuilderDescription(
          {
            role: item.role,
            organization: item.organization,
            dateYear: item.dateYear,
          },
          item.description,
        );

        return {
          ...item,
          description: aiText ?? item.description, // fallback
        };
      }),
    );

    return enhancedLeadership;
  }
};

export const cvbuilderService = {
  createCVbuilder,
  getAllCVbuilder,
  getSingleCVbuilder,
  updateCVbuilder,
  deleteCVbuilder,
  leaderShip,
};
