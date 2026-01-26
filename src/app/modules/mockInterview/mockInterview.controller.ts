import pick from '../../helper/pick';
import catchAsync from '../../utils/catchAsycn';
import sendResponse from '../../utils/sendResponse';
import { mockInterviewService } from './mockInterview.service';

const createMockInterview = catchAsync(async (req, res) => {
  const userId = req.user.id;
  const result = await mockInterviewService.createMockInterview(
    req.body,
    userId
  );

  sendResponse(res, {
    statusCode: 201,
    success: true,
    message: 'Mock interview created successfully',
    data: result,
  });
});

const getAllMockInterviews = catchAsync(async (req, res) => {
  const userId = req.user.id;
  const options = pick(req.query, ['limit', 'page', 'sortBy', 'sortOrder']);

  const result = await mockInterviewService.getAllMockInterviews(
    userId,
    options
  );

  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: 'Mock interviews retrieved successfully',
    data: result,
  });
});

const getMockInterviewById = catchAsync(async (req, res) => {
  const id = req.params.id;
  const result = await mockInterviewService.getMockInterviewById(id!);

  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: 'Mock interview retrieved successfully',
    data: result,
  });
});

const deleteMockInterviewById = catchAsync(async (req, res) => {
  const id = req.params.id;
  const result = await mockInterviewService.deleteMockInterviewById(id!);

  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: 'Mock interview deleted successfully',
    data: result,
  });
});

const updateMockInterview = catchAsync(async (req, res) => {
  const id = req.params.id;
  const userId = req.user.id;

  const result = await mockInterviewService.updateMockInterview(
    id!,
    req.body,
    userId
  );

  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: 'Mock interview updated successfully',
    data: result,
  });
});

export const mockInterviewController = {
  createMockInterview,
  getAllMockInterviews,
  getMockInterviewById,
  deleteMockInterviewById,
  updateMockInterview
};
