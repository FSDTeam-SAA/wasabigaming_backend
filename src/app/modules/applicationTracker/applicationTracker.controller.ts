import pick from '../../helper/pick';
import catchAsync from '../../utils/catchAsycn';
import sendResponse from '../../utils/sendResponse';
import { cvbuilderService } from '../cvbuilder/cvbuilder.service';
import { applicationTrackerService } from './applicationTracker.service';

const applicationTrackerOverview = catchAsync(async (req, res) => {
  const result = await applicationTrackerService.applicationTrackerOverview();
  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: 'Application Tracker Overview',
    data: result,
  });
});

const createApplication = catchAsync(async (req, res) => {
  const userId = req.user.id;

  const result = await applicationTrackerService.createApplication(
    userId,
    req.body,
  );
  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: 'Application Created Successfully',
    data: result,
  });
});

const getAllApplication = catchAsync(async (req, res) => {
  const filters = pick(req.query, ['searchTerm', 'status','applicationType']);
  const options = pick(req.query, ['limit', 'page', 'sortBy', 'sortOrder']);
  const result = await applicationTrackerService.getAllApplication(
    filters,
    options,
  );
  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: 'All Application',
    meta: result.meta,
    data: result.data,
  });
});

const getSingleApplication = catchAsync(async (req, res) => {
  const { id } = req.params;
  const result = await applicationTrackerService.getSingleApplication(id!);
  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: 'Single Application',
    data: result,
  });
});

const updateApplication = catchAsync(async (req, res) => {
  const { id } = req.params;
  const userId = req.user.id;
  const result = await applicationTrackerService.updateApplication(
    userId,
    id!,
    req.body,
  );
  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: 'Application Updated Successfully',
    data: result,
  });
});
const deleteApplication = catchAsync(async (req, res) => {
  const { id } = req.params;
  const userId = req.user.id;
  const result = await applicationTrackerService.deleteApplication(userId, id!);
  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: 'Application Deleted Successfully',
    data: result,
  });
});
// const getMyAverageScore = catchAsync(async (req, res) => {
//   const userId = req.user.id;

//   const result = await cvbuilderService.getUserAverageScore(userId);

//   sendResponse(res, {
//     statusCode: 200,
//     success: true,
//     message: 'Your average CV score retrieved successfully',
//     data: result,
//   });
// });

export const applicationTrackerController = {
  applicationTrackerOverview,
  createApplication,
  getAllApplication,
  updateApplication,
  getSingleApplication,
  deleteApplication
};
