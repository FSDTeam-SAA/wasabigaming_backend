import catchAsync from '../../utils/catchAsycn';
import sendResponse from '../../utils/sendResponse';
import { writtencasestudyService } from './writtencasestudy.service';

const createWrittenCaseStudy = catchAsync(async (req, res) => {
  // console.log(req.user?.id);
  const result = await writtencasestudyService.createWrittenCaseStudy(
    req.user?.id,
    req.params.id!,
  );

  sendResponse(res, {
    statusCode: 201,
    success: true,
    message: 'Written Case Study created successfully',
    data: result,
  });
});

const getSingleAiassessment = catchAsync(async (req, res) => {
  const result = await writtencasestudyService.getSingleWrittenCaseStudy(
    req.params.id!,
  );

  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: 'Single Ai assessment retrieved successfully',
    data: result,
  });
});

const updateWrittenCaseStudy = catchAsync(async (req, res) => {
  const result = await writtencasestudyService.updateWrittenCaseStudy(
    req.params.id!,
    req.body,
  );

  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: 'Written Case Study updated successfully',
    data: result,
  });
});

export const writtencasestudyController = {
  createWrittenCaseStudy,
  getSingleAiassessment,
  updateWrittenCaseStudy,
};
