import pick from '../../helper/pick';
import catchAsync from '../../utils/catchAsycn';
import sendResponse from '../../utils/sendResponse';
import { courseService } from './course.service';

const createCourse = catchAsync(async (req, res) => {
  const userId = req.user?.id;
  const file = req.file as Express.Multer.File;
  const fromData = req.body.data ? JSON.parse(req.body.data) : req.body;
  const result = await courseService.createCourse(userId, fromData, file);
  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: 'Course created successfully',
    data: result,
  });
});

const getAllCourse = catchAsync(async (req, res) => {
  const filters = pick(req.query, [
    'searchTerm',
    'name',
    'description',
    'gradeLevel',
    'category',
  ]);
  const options = pick(req.query, ['limit', 'page', 'sortBy', 'sortOrder']);
  const result = await courseService.getAllCourse(filters, options);
  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: 'Course fetched successfully',
    meta: result.meta,
    data: result.data,
  });
});

const getSingleCourse = catchAsync(async (req, res) => {
  const { id } = req.params;
  const result = await courseService.getSingleCourse(id!);
  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: 'Course fetched successfully',
    data: result,
  });
});

const uploadCourse = catchAsync(async (req, res) => {
  const { id } = req.params;
  const file = req.file as Express.Multer.File;
  const userId = req.user?.id;
  const fromData = req.body.data ? JSON.parse(req.body.data) : req.body;
  const result = await courseService.uploadCourse(userId, id!, fromData, file);
  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: 'Course uploaded successfully',
    data: result,
  });
});
const deleteCourse = catchAsync(async (req, res) => {
  const { id } = req.params;
  const userId = req.user?.id;
  const result = await courseService.deleteCourse(userId, id!);
  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: 'Course deleted successfully',
    data: result,
  });
});

export const courseController = {
  createCourse,
  getAllCourse,
  getSingleCourse,
  uploadCourse,
  deleteCourse,
};
