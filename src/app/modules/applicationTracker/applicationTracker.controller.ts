import catchAsync from '../../utils/catchAsycn';
import sendResponse from '../../utils/sendResponse';
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

export const applicationTrackerController = {
  applicationTrackerOverview,
  createApplication,
};
