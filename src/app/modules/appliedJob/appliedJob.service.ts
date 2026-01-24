import AppError from '../../error/appError';
import { fileUploader } from '../../helper/fileUploder';
import Job from '../job/job.model';
import User from '../user/user.model';
import { IAppliedJOb } from './appliedJob.interface';
import AppliedJob from './appliedJob.model';

const createAppliedJob = async (
  userId: string,
  payload: IAppliedJOb,
  file?: Express.Multer.File,
) => {
  const user = await User.findById(userId);
  if (!user) throw new AppError(404, 'User is not found');

  const job = await Job.findById(payload.jobId);
  if (!job) throw new AppError(404, 'Job is not found');

  if (file) {
    const cvFilcv = await fileUploader.uploadToCloudinary(file);
    payload.cv = cvFilcv.url;
  }

  const result = await AppliedJob.create({
    ...payload,
    userId: userId,
    jobId: payload.jobId,
  });

  job.applicants?.push(user._id);
  await job.save();

  return result;
};

export const appliedJobServices = {
  createAppliedJob,
};
