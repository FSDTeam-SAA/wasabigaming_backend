import catchAsync from '../../utils/catchAsycn';
import sendResponse from '../../utils/sendResponse';
import { PresentationTaskService } from './presentationtask.service';

const createPresentationTask = catchAsync(async (req, res) => {
  const result = await PresentationTaskService.createPresentationTask(
    req.user?.id,
    req.params.id!,
  );

  sendResponse(res, {
    statusCode: 201,
    success: true,
    message: 'Presentation Task created successfully',
    data: result,
  });
});
const getSinglePresentationTask = catchAsync(async (req, res) => {
  const result = await PresentationTaskService.getSinglePresentationTask(
    req.params.id!,
  );

  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: 'Presentation Task retrieved successfully',
    data: result,
  });
});

const updatePresentationTask = catchAsync(async (req, res) => {
    console.log("first")
  const result = await PresentationTaskService.updatePresentationTask(
    req.params.id!,
    req.body,
  );

  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: 'Presentation Task updated successfully',
    data: result,
  });
});
export const PresentationTaskController = {
  createPresentationTask,
  getSinglePresentationTask,
  updatePresentationTask,
};
