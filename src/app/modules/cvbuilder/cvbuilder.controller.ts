import pick from '../../helper/pick';
import catchAsync from '../../utils/catchAsycn';
import sendResponse from '../../utils/sendResponse';
import { cvbuilderService } from './cvbuilder.service';

const createCVbuilder = catchAsync(async (req, res) => {
  const userId = req.user?.id;
  const result = await cvbuilderService.createCVbuilder(userId, req.body);

  sendResponse(res, {
    statusCode: 201,
    success: true,
    message: 'CVbuilder created successfully',
    data: result,
  });
});

const getAllCVbuilder = catchAsync(async (req, res) => {
  const userId = req.user?.id;
  const filters = pick(req.query, [
    'searchTerm',
    'location',
    'phone',
    'email',
    'profession',
    'lastName',
    'firstName',
  ]);
  const options = pick(req.query, ['limit', 'page', 'sortBy', 'sortOrder']);
  const result = await cvbuilderService.getAllCVbuilder(
    userId,
    filters,
    options,
  );

  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: 'CVbuilders retrieved successfully',
    meta: result.meta,
    data: result.data,
  });
});

const getSingleCVbuilder = catchAsync(async (req, res) => {
  const result = await cvbuilderService.getSingleCVbuilder(req.params.id!);

  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: 'CVbuilder retrieved successfully',
    data: result,
  });
});

const updateCVbuilder = catchAsync(async (req, res) => {
  const userId = req.user?.id;
  const result = await cvbuilderService.updateCVbuilder(
    userId,
    req.params.id!,
    req.body,
  );

  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: 'CVbuilder updated successfully',
    data: result,
  });
});

const deleteCVbuilder = catchAsync(async (req, res) => {
  const userId = req.user?.id;
  const result = await cvbuilderService.deleteCVbuilder(userId, req.params.id!);

  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: 'CVbuilder deleted successfully',
    data: result,
  });
});

const leaderShip = catchAsync(async(req , res) => {

  const userId = req.user?.id;
  const result = await cvbuilderService.leaderShip(userId, req.body);

  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: 'Leadership description data updated successfully',
    data: result,
  });
})

const getMyAverageScore = catchAsync(async (req, res) => {
  const userId = req.user.id;

  const result = await cvbuilderService.getUserAverageScore(userId);

  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: 'Your average CV score retrieved successfully',
    data: result,
  });
});

export const cvbuilderController = {
  createCVbuilder,
  getAllCVbuilder,
  getSingleCVbuilder,
  updateCVbuilder,
  deleteCVbuilder,
  leaderShip,
  getMyAverageScore
};
