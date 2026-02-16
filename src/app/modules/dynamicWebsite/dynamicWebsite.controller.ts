// dynamicWebsite.controller.ts
import pick from '../../helper/pick';
import catchAsync from '../../utils/catchAsycn';
import sendResponse from '../../utils/sendResponse';
import { dynamicWebsiteService } from './dynamicWebsite.service';

const createDynamicWebsite = catchAsync(async (req, res) => {
  const file = req.file;
  const result = await dynamicWebsiteService.createDynamicWebsite(req.body, file);
  sendResponse(res, {
    statusCode: 201,
    success: true,
    message: 'Dynamic website created successfully',
    data: result,
  });
});

const getAllDynamicWebsite = catchAsync(async (req, res) => {
  const filters = pick(req.query, [
    'searchTerm',
    'title',
    'category',
    'status',
    'year',
  ]);
  const options = pick(req.query, ['limit', 'page', 'sortBy', 'sortOrder']);
  const result = await dynamicWebsiteService.getAllDynamicWebsite(filters, options);
  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: 'Dynamic websites retrieved successfully',
    meta: result.meta,
    data: result.data,
  });
});

const getSingleDynamicWebsite = catchAsync(async (req, res) => {
  const { id } = req.params;
  const result = await dynamicWebsiteService.getSingleDynamicWebsite(id!);
  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: 'Dynamic website retrieved successfully',
    data: result,
  });
});

const updateDynamicWebsite = catchAsync(async (req, res) => {
  const { id } = req.params;
  const result = await dynamicWebsiteService.updateDynamicWebsite(id!, req.body);
  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: 'Dynamic website updated successfully',
    data: result,
  });
});

const deleteDynamicWebsite = catchAsync(async (req, res) => {
  const { id } = req.params;
  const result = await dynamicWebsiteService.deleteDynamicWebsite(id!);
  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: 'Dynamic website deleted successfully',
    data: result,
  });
});

export const dynamicWebsiteController = {
  createDynamicWebsite,
  getAllDynamicWebsite,
  getSingleDynamicWebsite,
  updateDynamicWebsite,
  deleteDynamicWebsite,
};