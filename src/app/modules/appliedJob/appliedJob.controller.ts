import catchAsync from '../../utils/catchAsycn';
import sendResponse from '../../utils/sendResponse';
import { appliedJobServices } from './appliedJob.service';

const createAppliedJob = catchAsync(async (req, res) => {
  const userId = req.user?.id;
  const file = req.file as Express.Multer.File;
  const fromdata = req.body.data ? JSON.parse(req.body.data) : req.body;
  const result = await appliedJobServices.createAppliedJob(
    userId,
    fromdata,
    file,
  );

  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: 'Applied Job created successfully',
    data: result,
  });
});

export const appliedJobController = {
  createAppliedJob,
};
