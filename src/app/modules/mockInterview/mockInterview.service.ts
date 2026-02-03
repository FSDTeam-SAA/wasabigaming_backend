import MockInterview from './mockInterview.model';
import { IMockInterview } from './mockInterview.interface';
import pagination, { IOption } from '../../helper/pagenation';
import AppError from '../../error/appError';

const createMockInterview = async (
  payload: IMockInterview,
  userId?: string
) => {
  const mockInterviewData = {
    ...payload,
    createdBy: userId,
  };

  const result = await MockInterview.create(mockInterviewData);
  return result;
};

const getAllMockInterviews = async (
  userId: string,
  options: IOption
) => {
  const { page, limit, skip, sortBy, sortOrder } = pagination(options);

  const andCondition: any[] = [];
  // if (userId) {
  //   andCondition.push({ createdBy: userId });
  // }

  const whereCondition = andCondition.length ? { $and: andCondition } : {};

  const result = await MockInterview.find(whereCondition)
    .skip(skip)
    .limit(limit)
    .sort({ [sortBy]: sortOrder } as any);

  const total = await MockInterview.countDocuments(whereCondition);

  return {
    data: result,
    meta: {
      total,
      page,
      limit,
    },
  };
};

const getMockInterviewById = async (id: string) => {
  const mockInterview = await MockInterview.findById(id);

  if (!mockInterview) {
    throw new AppError(404, 'Mock Interview not found');
  }

  return mockInterview;
};

const deleteMockInterviewById = async (id: string) => {
  const mockInterview = await MockInterview.findByIdAndDelete(id);

  if (!mockInterview) {
    throw new AppError(404, 'Mock Interview not found');
  }

  return mockInterview;
};
const updateMockInterview = async (
  id: string,
  payload: Partial<any>,
  userId?: string
) => {
  const mockInterview = await MockInterview.findById(id);

  if (!mockInterview) {
    throw new AppError(404, 'Mock Interview not found');
  }

  // optional: only creator/admin can update
  if (
    mockInterview.createdBy &&
    userId &&
    mockInterview.createdBy.toString() !== userId
  ) {
    throw new AppError(403, 'You are not allowed to update this mock interview');
  }

  const updatedData = await MockInterview.findByIdAndUpdate(
    id,
    payload,
    {
      new: true,
      runValidators: true,
    }
  );

  return updatedData;
};


export const mockInterviewService = {
  createMockInterview,
  getAllMockInterviews,
  getMockInterviewById,
  deleteMockInterviewById,
  updateMockInterview
};
