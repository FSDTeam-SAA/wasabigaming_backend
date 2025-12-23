import catchAsync from '../../utils/catchAsycn';
import sendResponse from '../../utils/sendResponse';
import { ingestAiPsychometricResult } from './psychometricAi.service';

export const ingestAiResult = catchAsync(async (req, res) => {
  const result = await ingestAiPsychometricResult(req.body);

  sendResponse(res, {
    statusCode: 201,
    success: true,
    message: 'AI psychometric result processed successfully',
    data: result,
  });
});
