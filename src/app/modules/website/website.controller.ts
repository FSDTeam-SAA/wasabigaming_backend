import pick from '../../helper/pick';
import catchAsync from '../../utils/catchAsycn';
import sendResponse from '../../utils/sendResponse';
import { websiteService } from './website.service';

const createWebsite = catchAsync(async (req, res) => {
  const files = req.files as Express.Multer.File[];
  const formData = req.body.data ? JSON.parse(req.body.data) : req.body;
  const result = await websiteService.createWebsite(formData, files);
  sendResponse(res, {
    statusCode: 201,
    success: true,
    message: 'Website created successfully',
    data: result,
  });
});

const updateWebsite = catchAsync(async (req, res) => {
  const { id } = req.params;
  const formData = req.body.data ? JSON.parse(req.body.data) : req.body;
  const result = await websiteService.updateWebsite(
    id!,
    formData,
    req.files as Express.Multer.File[],
  );
  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: 'Website updated successfully',
    data: result,
  });
});

const getAllWebsite = catchAsync(async (req, res) => {
  const filters = pick(req.query, [
    'searchTerm',
    'subtitle',
    'type',
    'title',
    'description',
  ]);
  const options = pick(req.query, ['limit', 'page', 'sortBy', 'sortOrder']);
  const result = await websiteService.getAllWebsite(filters, options);
  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: 'Websites retrieved successfully',
    meta: result.meta,
    data: result.data,
  });
});

const getWebsiteById = catchAsync(async (req, res) => {
  const { id } = req.params;
  const result = await websiteService.getWebsiteById(id!);
  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: 'Website retrieved successfully',
    data: result,
  });
});

const deleteWebsite = catchAsync(async (req, res) => {
  const { id } = req.params;
  const result = await websiteService.deleteWebsite(id!);
  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: 'Website deleted successfully',
    data: result,
  });
});

// const getWebsiteByKey = catchAsync(async (req, res) => {
//   const { key } = req.params;
//   const result = await websiteService.getWebsiteByKey(key!);
//   sendResponse(res, {
//     statusCode: 200,
//     success: true,
//     message: 'Website retrieved successfully',
//     data: result,
//   });
// });

// const removeWebsite = catchAsync(async (req, res) => {
//   const { id } = req.params;
//   const result = await websiteService.removeWebsite(id!);
//   sendResponse(res, {
//     statusCode: 200,
//     success: true,
//     message: 'Website deleted successfully',
//     data: result,
//   });
// });

export const websiteController = {
  createWebsite,
  updateWebsite,
  getAllWebsite,
  getWebsiteById,
  deleteWebsite,
  // getWebsiteByKey,
  // removeWebsite,
};
