import AppError from '../../error/appError';
import pagination, { IOption } from '../../helper/pagenation';
import User from '../user/user.model';
import { ITask } from './task.interface';
import Task from './task.model';

const createTask = async (userId: string, payload: ITask) => {
  const user = await User.findById(userId);
  if (!user) throw new AppError(404, 'User not found');
  const result = await Task.create({ ...payload });
  if (!result) throw new AppError(400, 'Task creation failed');
  return result;
};

const getAllTasks = async (params: any, options: IOption) => {
  const { page, limit, skip, sortBy, sortOrder } = pagination(options);
  const { searchTerm, year, ...filterData } = params;

  const andCondition: any[] = [];
  const userSearchableFields = ['title', 'status'];

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

  const result = await Task.find(whereCondition)
    .skip(skip)
    .limit(limit)
    .sort({ [sortBy]: sortOrder } as any);

  if (!result) {
    throw new AppError(404, 'Quizzes not found');
  }

  const total = await Task.countDocuments(whereCondition);

  return {
    data: result,
    meta: {
      total,
      page,
      limit,
    },
  };
};

const getSingleTask = async (id: string) => {
  const result = await Task.findById(id);
  if (!result) {
    throw new AppError(404, 'Task not found');
  }
  return result;
};

const updateTask = async (
  userId: string,
  id: string,
  payload: Partial<ITask>,
) => {
  const user = await User.findById(userId);
  if (!user) {
    throw new AppError(400, 'User not found');
  }
  const quizzes = await Task.findById(id);
  if (!quizzes) {
    throw new AppError(400, 'quizzes not found');
  }

  if (user.role !== 'admin') {
    if (quizzes?.createdBy?.toString() !== user._id.toString()) {
      throw new AppError(400, 'You are not authorized to update this quizzes');
    }
  }

  const result = await Task.findByIdAndUpdate(
    id,
    { ...payload, createdBy: user._id },
    { new: true },
  );
  return result;
};

const deleteTask = async (userId: string, id: string) => {
  const user = await User.findById(userId);
  if (!user) {
    throw new AppError(400, 'User not found');
  }
  const quizzes = await Task.findById(id);
  if (!quizzes) {
    throw new AppError(400, 'quizzes not found');
  }

  if (user.role !== 'admin') {
    if (quizzes?.createdBy?.toString() !== user._id.toString()) {
      throw new AppError(400, 'You are not authorized to delete this quizzes');
    }
  }

  const result = await Task.findByIdAndDelete(id);
  return result;
};


export const taskService = {
  createTask,
  getAllTasks,
  getSingleTask,
  updateTask,
  deleteTask,
};
