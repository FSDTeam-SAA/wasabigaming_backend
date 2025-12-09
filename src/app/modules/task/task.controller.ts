import pick from '../../helper/pick';
import catchAsync from '../../utils/catchAsycn';
import sendResponse from '../../utils/sendResponse';
import { taskService } from './task.service';

const createTask = catchAsync(async (req, res) => {
  const userId = req.user.id;
  const result = await taskService.createTask(userId, req.body);
  sendResponse(res, {
    statusCode: 201,
    success: true,
    message: 'Task created successfully',
    data: result,
  });
});

const getAllTasks = catchAsync(async (req, res) => {
  const filters = pick(req.query, ['searchTerm', 'title', 'status']);
  const options = pick(req.query, ['limit', 'page', 'sortBy', 'sortOrder']);
  const result = await taskService.getAllTasks(filters, options);
  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: 'Tasks retrieved successfully',
    meta: result.meta,
    data: result.data,
  });
});

const getSingleTask = catchAsync(async (req, res) => {
  const { id } = req.params;
  const result = await taskService.getSingleTask(id!);
  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: 'Task retrieved successfully',
    data: result,
  });
});
const updateTask = catchAsync(async (req, res) => {
  const userId = req.user.id;
  const { id } = req.params;
  const result = await taskService.updateTask(userId, id!, req.body);
  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: 'Task updated successfully',
    data: result,
  });
});
const deleteTask = catchAsync(async (req, res) => {
  const userId = req.user.id;
  const { id } = req.params;
  const result = await taskService.deleteTask(userId, id!);
  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: 'Task deleted successfully',
    data: result,
  });
});

export const taskController = {
  createTask,
  getAllTasks,
  getSingleTask,
  updateTask,
  deleteTask,
};
