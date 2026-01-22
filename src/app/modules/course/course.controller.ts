import pick from '../../helper/pick';
import catchAsync from '../../utils/catchAsycn';
import sendResponse from '../../utils/sendResponse';
import { courseService } from './course.service';

// const createCourse = catchAsync(async (req, res) => {
//   const userId = req.user?.id;
//   const files = req.files as Express.Multer.File[]; // multiple files
//   const fromData = req.body.data ? JSON.parse(req.body.data) : req.body;

//   // optional titles array for videos
//   const titles = req.body.titles ? JSON.parse(req.body.titles) : undefined;

//   const result = await courseService.createCourse(
//     userId,
//     fromData,
//     files,
//     titles,
//   );

//   sendResponse(res, {
//     statusCode: 200,
//     success: true,
//     message: 'Course created successfully',
//     data: result,
//   });
// });
const createCourse = catchAsync(async (req, res) => {
  const userId = req.user?.id;

  const files = req.files as {
    courseVideo?: Express.Multer.File[];
    thumbnail?: Express.Multer.File[];
  };

  const fromData = req.body.data ? JSON.parse(req.body.data) : req.body;
  const titles = req.body.titles ? JSON.parse(req.body.titles) : undefined;

  const result = await courseService.createCourse(
    userId,
    fromData,
    files,
    titles,
  );

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
    message: 'Courses fetched successfully',
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

// const uploadCourse = catchAsync(async (req, res) => {
//   const { id } = req.params;
//   const userId = req.user?.id;
//   const files = req.files as Express.Multer.File[]; // multiple files
//   const fromData = req.body.data ? JSON.parse(req.body.data) : req.body;
//   const titles = req.body.titles ? JSON.parse(req.body.titles) : undefined;

//   const result = await courseService.uploadCourse(
//     userId,
//     id!,
//     fromData,
//     files,
//     titles,
//   );

//   sendResponse(res, {
//     statusCode: 200,
//     success: true,
//     message: 'Course updated successfully',
//     data: result,
//   });
// });
const uploadCourse = catchAsync(async (req, res) => {
  const userId = req.user?.id;
  const courseId = req.params.id;

  const files = req.files as {
    courseVideo?: Express.Multer.File[];
    thumbnail?: Express.Multer.File[];
  };

  const formData = req.body.data ? JSON.parse(req.body.data) : req.body;
  const titles = req.body.titles ? JSON.parse(req.body.titles) : undefined;

  const result = await courseService.uploadCourse(
    userId,
    courseId!,
    formData,
    files,
    titles,
  );

  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: 'Course updated successfully',
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

const addVideo = catchAsync(async (req, res) => {
  const userId = req.user?.id;
  const { id } = req.params;
  const files = req.files as Express.Multer.File[];
  const titles = req.body.titles ? JSON.parse(req.body.titles) : undefined;

  const result = await courseService.addCourseVideo(userId, id!, files, titles);

  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: 'Video added successfully',
    data: result,
  });
});

const removeVideo = catchAsync(async (req, res) => {
  const userId = req.user?.id;
  const { courseId, videoId } = req.params;

  const result = await courseService.removeCourseVideo(
    userId,
    courseId!,
    videoId!,
  );

  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: 'Video removed successfully',
    data: result,
  });
});

const payCourse = catchAsync(async (req, res) => {
  const { id } = req.params;
  const userId = req.user?.id;
  const result = await courseService.payCourse(userId, id!);

  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: 'Course paid successfully',
    data: result,
  });
});

const couseEnroleuser = catchAsync(async (req, res) => {
  const userId = req.user?.id;
  const result = await courseService.couseEnroleuser(userId, req.params.id!);
  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: 'Course Enrolled successfully',
    data: result,
  });
});

export const courseController = {
  createCourse,
  getAllCourse,
  getSingleCourse,
  uploadCourse,
  deleteCourse,
  addVideo,
  removeVideo,
  payCourse,
  couseEnroleuser,
};
