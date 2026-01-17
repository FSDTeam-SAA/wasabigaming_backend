import pick from '../../helper/pick';
import catchAsync from '../../utils/catchAsycn';
import sendResponse from '../../utils/sendResponse';
import { quizzesService } from './quizzes.service';

// const createQuizzes = catchAsync(async (req, res) => {
//   const file = req.file as Express.Multer.File;
//   const fromData = req.body.data ? JSON.parse(req.body.data) : req.body;
//   const result = await quizzesService.createQuizzes(
//     req.user?.id,
//     fromData,
//     file,
//   );

//   sendResponse(res, {
//     statusCode: 201,
//     success: true,
//     message: 'Quizzes created successfully',
//     data: result,
//   });
// });

const createQuizzes = catchAsync(async (req, res) => {
  const result = await quizzesService.createQuizzes(req.body);
  sendResponse(res, {
    statusCode: 201,
    success: true,
    message: 'Quizzes created successfully',
    data: result,
  });
});

const getAllquizzes = catchAsync(async (req, res) => {
  const filters = pick(req.query, ['searchTerm', 'title', 'status']);
  const options = pick(req.query, ['limit', 'page', 'sortBy', 'sortOrder']);
  const result = await quizzesService.getAllquizzes(filters, options);
  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: 'Quizzes fetched successfully',
    meta: result.meta,
    data: result.data,
  });
});

const getSingleQuizzes = catchAsync(async (req, res) => {
  const { id } = req.params;
  const result = await quizzesService.getSingleQuizzes(id!);
  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: 'Quizzes fetched successfully',
    data: result,
  });
});

// const uploadQuizzes = catchAsync(async (req, res) => {
//   const { id } = req.params;
//   const file = req.file as Express.Multer.File;
//   const fromData = req.body.data ? JSON.parse(req.body.data) : req.body;
//   const result = await quizzesService.uploadQuizzes(
//     req.user?.id,
//     id!,
//     fromData,
//     file,
//   );
//   sendResponse(res, {
//     statusCode: 200,
//     success: true,
//     message: 'Quizzes uploaded successfully',
//     data: result,
//   });
// });

const updateQuizzes = catchAsync(async (req, res) => {
  const { id } = req.params;
  const result = await quizzesService.updateQuizzes(id!, req.body);
  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: 'Quizzes updated successfully',
    data: result,
  });
});

const deleteQuizzes = catchAsync(async (req, res) => {
  const { id } = req.params;
  const result = await quizzesService.deleteQuizzes(id!);
  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: 'Quizzes deleted successfully',
    data: result,
  });
});

export const quizzesController = {
  createQuizzes,
  getAllquizzes,
  getSingleQuizzes,
  updateQuizzes,
  deleteQuizzes,
};
