import catchAsync from '../../utils/catchAsycn';
import sendResponse from '../../utils/sendResponse';
import { dashyboardService } from './dashboard.service';

const adminOverview = catchAsync(async (req, res) => {
  const result = await dashyboardService.adminOverview();
  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: 'Admin overview data fetched successfully',
    data: result,
  });
});

export const dashboardController = {
  adminOverview,
};
