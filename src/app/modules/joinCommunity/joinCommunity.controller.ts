// community.controller.ts
import pick from '../../helper/pick';
import catchAsync from '../../utils/catchAsycn';
import sendResponse from '../../utils/sendResponse';
import { communityService } from './joinCommunity.service';

const createCommunity = catchAsync(async (req, res) => {
  const result = await communityService.createCommunity(req.body);
  sendResponse(res, {
    statusCode: 201,
    success: true,
    message: 'Successfully joined the community',
    data: result,
  });
});

const getAllCommunity = catchAsync(async (req, res) => {
  const filters = pick(req.query, [
    'searchTerm',
    'fullName',
    'email',
    'cityOrTown',
    'yearGroup',
    'status',
    'year',
  ]);
  const options = pick(req.query, ['limit', 'page', 'sortBy', 'sortOrder']);
  const result = await communityService.getAllCommunity(filters, options);
  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: 'Community members retrieved successfully',
    meta: result.meta,
    data: result.data,
  });
});

const getSingleCommunity = catchAsync(async (req, res) => {
  const { id } = req.params;
  const result = await communityService.getSingleCommunity(id!);
  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: 'Community member retrieved successfully',
    data: result,
  });
});

const updateCommunity = catchAsync(async (req, res) => {
  const { id } = req.params;
  const result = await communityService.updateCommunity(id!, req.body);
  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: 'Community member updated successfully',
    data: result,
  });
});

const deleteCommunity = catchAsync(async (req, res) => {
  const { id } = req.params;
  const result = await communityService.deleteCommunity(id!);
  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: 'Community member deleted successfully',
    data: result,
  });
});

export const communityController = {
  createCommunity,
  getAllCommunity,
  getSingleCommunity,
  updateCommunity,
  deleteCommunity,
};