import catchAsync from '../../utils/catchAsycn';
import sendResponse from '../../utils/sendResponse';
import { intrayemailService } from './intrayemail.service';

const createintrayemail = catchAsync(async (req, res) => {
  const result = await intrayemailService.createIntrayemail(
    req.user?.id,
    req.body,
  );

  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: 'Presentation task created successfully',
    data: result,
  });
});

const getSingleIntrayemail = catchAsync(async (req, res) => {
  const result = await intrayemailService.getSingleIntrayemail(req.params.id!);

  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: 'Presentation task fetched successfully',
    data: result,
  });
});

const updateIntrayemail = catchAsync(async (req, res) => {
  const result = await intrayemailService.updateIntrayemail(
    req.params.id!,
    req.body,
  );

  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: 'Presentation task updated successfully',
    data: result,
  });
});
export const intrayemailController = {
  createintrayemail,
  getSingleIntrayemail,
  updateIntrayemail,
};
