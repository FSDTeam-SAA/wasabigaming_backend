import AppError from '../../error/appError';
import { JobBookmark } from './jobBookmark.model';
import Job from '../job/job.model';
import pagination, { IOption } from '../../helper/pagenation';

const addJobBookmark = async (userId: string, jobId: string) => {
  const job = await Job.findById(jobId);
  if (!job) {
    throw new AppError(404, 'Job not found');
  }

  try {
    const bookmark = await JobBookmark.create({
      user: userId,
      job: jobId,
    });

    return bookmark;
  } catch (error: any) {
    // duplicate bookmark (unique index)
    if (error.code === 11000) {
      throw new AppError(400, 'Job already bookmarked');
    }
    throw error;
  }
};

const removeJobBookmark = async (userId: string, jobId: string) => {
  const deleted = await JobBookmark.findOneAndDelete({
    user: userId,
    job: jobId,
  });
  
  if (!deleted) {
    throw new AppError(404, 'Bookmark not found');
  }

  return deleted;
};

const getAllBookmarks = async (
  userId: string,
  options: IOption
) => {
  const { page, limit, skip, sortBy, sortOrder } = pagination(options);
  const andCondition: any[] = [];
  let whereCondition: any = { user: userId };

  if (andCondition.length > 0) {
    whereCondition = { ...whereCondition, $and: andCondition };
  }
  const result = await JobBookmark.find(whereCondition)
    .populate('job') 
    .skip(skip)
    .limit(limit)
    .sort({ [sortBy]: sortOrder } as any);

  if (!result || result.length === 0) {
    throw new AppError(404, 'No bookmarked jobs found');
  }

  const total = await JobBookmark.countDocuments(whereCondition);

  return {
    data: result,
    meta: { total, page, limit },
  };
};


export const jobBookmarkService = {
  addJobBookmark,
  removeJobBookmark,
  getAllBookmarks
};
