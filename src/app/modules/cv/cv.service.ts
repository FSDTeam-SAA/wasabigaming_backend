import AppError from '../../error/appError';
import { fileUploader } from '../../helper/fileUploder';
import pagination, { IOption } from '../../helper/pagenation';
import Job from '../job/job.model';
import User from '../user/user.model';
import { ICv } from './cv.interface';
import Cv from './cv.model';

const applyJob = async (
  userId: string,
  jobId: string,
  payload: ICv,
  file: Express.Multer.File,
) => {
  const user = await User.findById(userId);
  if (!user) throw new AppError(404, 'User not found');
  const job = await Job.findById(jobId);
  if (!job) throw new AppError(404, 'Job not found');

  if (file) {
    const cvfile = await fileUploader.uploadToCloudinary(file);
    payload.cvUrl = cvfile.url;
  }

  const result = await Cv.create({
    ...payload,
    studentId: user._id,
    applicationId: job._id,
  });
  return result;
};

const getAllCv = async (options: IOption) => {
  const { page, limit, skip, sortBy, sortOrder } = pagination(options);
  const cv = await Cv.find()
    .skip(skip)
    .limit(limit)
    .sort({ [sortBy]: sortOrder } as any)
    .populate('studentId', 'name email')
    .populate('applicationId', 'title');
  const total = await Cv.countDocuments();
  if (!cv) throw new AppError(404, 'CV not found');
  return { data: cv, meta: { total, page, limit } };
};

const getSingleCv = async (id: string) => {
  const cv = await Cv.findById(id);
  if (!cv) throw new AppError(404, 'CV not found');
  return cv;
};

export const cvService = {
  applyJob,
  getAllCv,
  getSingleCv,
};
