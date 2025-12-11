import AppError from '../../error/appError';
import pagination, { IOption } from '../../helper/pagenation';
import { userRole } from '../user/user.constant';
import User from '../user/user.model';
import { IJob } from './job.interface';
import Job from './job.model';

const createJob = async (userId: string, payload: IJob) => {
  const user = await User.findById(userId);
  if (!user) throw new AppError(404, 'user is not found');
  const result = await Job.create({ ...payload, createBy: user._id });
  return result;
};

const getAllJobs = async (params: any, options: IOption) => {
  const { page, limit, skip, sortBy, sortOrder } = pagination(options);
  const { searchTerm, year, ...filterData } = params;

  const andCondition: any[] = [];
  const userSearchableFields = [
    'status',
    'additionalInfo',
    'responsibilities',
    'description',
    'jobStatus',
    'salaryRange',
    'level',
    'postedBy',
    'companyType',
    'companyName',
    'location',
    'title',
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

  const result = await Job.find(whereCondition)
    .skip(skip)
    .limit(limit)
    .sort({ [sortBy]: sortOrder } as any);

  if (!result) {
    throw new AppError(404, 'Job not found');
  }

  const total = await Job.countDocuments(whereCondition);

  return {
    data: result,
    meta: {
      total,
      page,
      limit,
    },
  };
};

const singleJob = async (id: string) => {
  const result = await Job.findById(id);
  if (!result) {
    throw new AppError(404, 'Job not found');
  }
  return result;
};

const updateJob = async (
  userId: string,
  id: string,
  payload: Partial<IJob>,
) => {
  const user = await User.findById(userId);
  if (!user) throw new AppError(404, 'user is not found');

  const job = await Job.findById(id);
  if (!job) throw new AppError(404, 'Job not found');
  if (user.role !== userRole.admin) {
    if (job.createBy?.toString() !== userId)
      throw new AppError(404, 'You are not authorized to update this job');
  }

  const result = await Job.findByIdAndUpdate(id, payload, { new: true });
  return result;
};

const deleteJob = async (userId: string, id: string) => {
  const user = await User.findById(userId);
  if (!user) throw new AppError(404, 'user is not found');

  const job = await Job.findById(id);
  if (!job) throw new AppError(404, 'Job not found');
  if (user.role !== userRole.admin) {
    if (job.createBy?.toString() !== userId)
      throw new AppError(404, 'You are not authorized to delete this job');
  }

  const result = await Job.findByIdAndDelete(id);
  return result;
};

const approvedJob = async (id: string) => {
  const result = await Job.findByIdAndUpdate(
    id,
    { status: 'active' },
    { new: true },
  );
  if (!result) throw new AppError(404, 'Job not found');
  return result;
};

export const jobService = {
  createJob,
  getAllJobs,
  singleJob,
  updateJob,
  deleteJob,
  approvedJob,
};
