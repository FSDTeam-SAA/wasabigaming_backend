import AppError from '../../error/appError';
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

  const file = req.file;
  console.log("first")
  if(!file){
    throw new AppError(400, 'File is required');
  }
  const result = await PresentationTaskService.updatePresentationTask(
    req.params.id!,
    req.body,
    file,
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
