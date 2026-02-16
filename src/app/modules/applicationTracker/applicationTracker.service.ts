import mongoose from 'mongoose';
import AppError from '../../error/appError';
import pagination, { IOption } from '../../helper/pagenation';
import Course from '../course/course.model';
import CVbuilder from '../cvbuilder/cvbuilder.model';
import Task from '../task/task.model';
import { userRole } from '../user/user.constant';
import User from '../user/user.model';
import { IApplicationTracker } from './applicationTracker.interface';
import ApplicationTracker from './applicationTracker.model';

const applicationTrackerOverview = async () => {
  const totalStudent = await User.countDocuments({ role: 'student' });
  const activeCourse = await Course.countDocuments({ status: 'active' });
  const pandingTask = await Task.countDocuments({ status: 'pending' });
  const totalApplication = '';
  return {
    totalStudent,
    activeCourse,
    pandingTask,
    totalApplication,
  };
};

const createApplication = async (
  userId: string,
  payload: IApplicationTracker,
) => {
  const user = await User.findById(userId);
  if (!user) {
    throw new AppError(404, 'User not found');
  }
  const school = await User.findById(payload.schoolName);
  if (!user) {
    throw new AppError(404, 'school not found');
  }
  if (school?.role !== userRole.school) {
    throw new AppError(404, 'school not found');
  }
  const result = await ApplicationTracker.create({
    ...payload,
    createBy: user._id,
  });
  if (!result) {
    throw new AppError(404, 'Application not created');
  }
  return result;
};

const getAllApplication = async (params: any, options: IOption) => {
  const { page, limit, skip, sortBy, sortOrder } = pagination(options);
  const { searchTerm, year, ...filterData } = params;

  const andCondition: any[] = [];
  const userSearchableFields = ['status', 'applicationType'];

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

  const result = await ApplicationTracker.find(whereCondition)
    .skip(skip)
    .limit(limit)
    .sort({ [sortBy]: sortOrder } as any)
    .populate('createBy', '-password')
    .populate('schoolName', '-password');

  if (!result) {
    throw new AppError(404, 'application tracker not found');
  }

  const total = await ApplicationTracker.countDocuments(whereCondition);

  return {
    data: result,
    meta: {
      total,
      page,
      limit,
    },
  };
};

const getSingleApplication = async (id: string) => {
  const result = await ApplicationTracker.findById(id)
    .populate('createBy', '-password')
    .populate('schoolName', '-password');
  if (!result) {
    throw new AppError(404, 'application tracker not found');
  }
  return result;
};

const updateApplication = async (
  userId: string,
  id: string,
  payload: Partial<IApplicationTracker>,
) => {
  const user = await User.findById(userId);
  if (!user) throw new AppError(404, 'User not found');
  const application = await ApplicationTracker.findById(id);
  if (!application) throw new AppError(404, 'Application not found');

  if (user.role !== userRole.admin) {
    if (application?.createBy?.toString() !== user._id.toString()) {
      throw new AppError(
        404,
        'You are not authorized to update this application',
      );
    }
  }
  const result = await ApplicationTracker.findByIdAndUpdate(id, payload, {
    new: true,
  });

  return result;
};

const deleteApplication = async (userId: string, id: string) => {
  const user = await User.findById(userId);
  if (!user) throw new AppError(404, 'User not found');
  const application = await ApplicationTracker.findById(id);
  if (!application) throw new AppError(404, 'Application not found');
  if (user.role !== userRole.admin) {
    if (application?.createBy?.toString() !== user._id.toString()) {
      throw new AppError(
        404,
        'You are not authorized to delete this application',
      );
    }
  }
  const result = await ApplicationTracker.findByIdAndDelete(id);
  return result;
};

// const getUserAverageScore = async (userId: string) => {
//   const result = await CVbuilder.aggregate([
//     {
//       $match: {
//         createBy: new mongoose.Types.ObjectId(userId),
//         score: { $ne: null },
//       },
//     },
//     {
//       $group: {
//         _id: '$createBy',
//         averageScore: { $avg: '$score' },
//       },
//     },
//     {
//       $project: {
//         _id: 0,
//         averageScore: { $round: ['$averageScore', 2] },
//       },
//     },
//   ]);

//   return result[0] || { averageScore: 0 };
// };


export const applicationTrackerService = {
  applicationTrackerOverview,
  createApplication,
  getAllApplication,
  updateApplication,
  getSingleApplication,
  deleteApplication,

};
