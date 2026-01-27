import AppError from '../../error/appError';
import { aiIntregation } from '../../helper/aiEndpoint';
import pagination, { IOption } from '../../helper/pagenation';
import Lawfirm from '../lawfirm/lawfirm.model';
import { userRole } from '../user/user.constant';
import User from '../user/user.model';
import { IJob } from './job.interface';
import Job from './job.model';

export interface ILawFirmJob {
  vacancy_id: string;
  title: string;
  url: string;
  employer: string;
  location: string;
  distance: string;
  start_date: string;
  training_course: string;
  wage: string;
  closing_text: string;
  posted_date: string;
  disability_confident: boolean;
  companyType: string;
}

const createManualJob = async (userId: string, payload: IJob) => {
  const user = await User.findById(userId);
  if (!user) throw new AppError(404, 'user is not found');

  const result = await Job.create({ ...payload, createBy: userId });
  return result;
};

const createJob = async (
  userId: string,
  job_title: string,
) => {
  const user = await User.findById(userId);
  if (!user) throw new AppError(404, 'user is not found');

  const dataResponse: ILawFirmJob[] = await aiIntregation.lawFirmAi(
    job_title,
  );

  const result = await Promise.all(
    dataResponse.map(async (data) => {
      const lawfirm = await Lawfirm.findOne({ firmName: data.employer });
      const jobID = await Job.findOne({ jobId: data.vacancy_id });
      if (jobID) {
        return null;
      }
      const job = await Job.findOneAndUpdate({
        title: data.title,
        url: data.url,
        location: data.location,
        companyName: data.employer,
        companyType: data?.companyType || null,
        postedBy: data.employer,
        description: data.training_course || null,
        level: data.training_course || null,
        salaryRange: data.wage || '0',
        startDate: data.start_date,
        applicationDeadline: data.closing_text,
        jobId: data.vacancy_id,
        jobStatus: 'Open',
        status: 'inactive',
        createBy: userId,
        companyId: lawfirm?._id || null,
      });

      if (lawfirm && job) {
        lawfirm?.jobs?.push(job._id);
        await lawfirm.save();
      }

      return job;
    }),
  );

  // Filter out null values (existing jobs)
  const filteredResult = result.filter((job) => job !== null);

  return filteredResult;
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

const appliedJob = async (userId: string, params: any, options: IOption) => {
  const user = await User.findById(userId);
  if (!user) throw new AppError(404, 'User not found');

  const { page, limit, skip, sortBy, sortOrder } = pagination(options);
  const { searchTerm, ...filterData } = params;

  const andCondition: any[] = [];

  const searchableFields = [
    'title',
    'location',
    'companyName',
    'companyType',
    'postedBy',
    'level',
  ];

  // search
  if (searchTerm) {
    andCondition.push({
      $or: searchableFields.map((field) => ({
        [field]: { $regex: searchTerm, $options: 'i' },
      })),
    });
  }

  // filters
  if (Object.keys(filterData).length) {
    andCondition.push({
      $and: Object.entries(filterData).map(([field, value]) => ({
        [field]: value,
      })),
    });
  }

  // applied job condition
  andCondition.push({ applicants: userId });

  const whereCondition = andCondition.length > 0 ? { $and: andCondition } : {};

  const result = await Job.find(whereCondition)
    .populate('applicants', 'name email')
    .skip(skip)
    .limit(limit)
    .sort({ [sortBy]: sortOrder } as any);

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

// const filterJobCvBased = async(
//   file?:Express.Multer.file
// ) => {


// }

export const jobService = {
  createJob,
  getAllJobs,
  singleJob,
  updateJob,
  deleteJob,
  approvedJob,
  createManualJob,
  appliedJob,
  // filterJobCvBased
};
