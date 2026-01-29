// import pick from '../../helper/pick';
// import catchAsync from '../../utils/catchAsycn';
// import sendResponse from '../../utils/sendResponse';
// import { psychometricService } from './psychometricAttempt.service';

import AppError from '../../error/appError';
import pick from '../../helper/pick';
import catchAsync from '../../utils/catchAsycn';
import sendResponse from '../../utils/sendResponse';
import { psychometricAttemptService } from './psychometricAttempt.service';
// import { psychometricAttemptService } from './psychometricAttempt.service';

// const createPsychometric = catchAsync(async (req, res) => {
//   const userId = req.user?.id;
//   const result = await psychometricService.createPsychometric(userId, req.body);
//   sendResponse(res, {
//     statusCode: 201,
//     success: true,
//     message: 'Psychometric created successfully',
//     data: result,
//   });
// });

// const getAllPsychometric = catchAsync(async (req, res) => {
//   const filters = pick(req.query, [
//     'searchTerm',
//     'title',
//     'description',
//     'type',
//     'questions.difficulty',
//   ]);
//   const options = pick(req.query, ['limit', 'page', 'sortBy', 'sortOrder']);
//   const result = await psychometricService.getAllPsychometric(filters, options);
//   sendResponse(res, {
//     statusCode: 200,
//     success: true,
//     message: 'Psychometrics retrieved successfully',
//     meta: result.meta,
//     data: result.data,
//   });
// });

// const getPsychometricById = catchAsync(async (req, res) => {
//   const result = await psychometricService.getPsychometricById(req.params.id!);
//   sendResponse(res, {
//     statusCode: 200,
//     success: true,
//     message: 'Psychometric retrieved successfully',
//     data: result,
//   });
// });

// const updatePsychometric = catchAsync(async (req, res) => {
//   const result = await psychometricService.updatePsychometric(
//     req.params.id!,
//     req.body,
//   );
//   sendResponse(res, {
//     statusCode: 200,
//     success: true,
//     message: 'Psychometric updated successfully',
//     data: result,
//   });
// });

// const deletePsychometric = catchAsync(async (req, res) => {
//   const result = await psychometricService.deletePsychometric(req.params.id!);
//   sendResponse(res, {
//     statusCode: 200,
//     success: true,
//     message: 'Psychometric deleted successfully',
//     data: result,
//   });
// });

// export const psychometricController = {
//   createPsychometric,
//   getAllPsychometric,
//   getPsychometricById,
//   updatePsychometric,
//   deletePsychometric,
// };

//=================================== update psychometricController =============================================
const submitPsychometricTest = catchAsync(async (req, res) => {
  console.log("hello saurav")
  const { id } = req.params; // testId
  const userId = req.user?.id;

  const result = await psychometricAttemptService.submitPsychometricTest(
    id!,
    userId!,
    req.body.answers,
  );

  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: 'Test submitted successfully',
    data: result,
  });
});

const tryAgainPsychometricAttempt = catchAsync(async (req, res) => {
  const testId = req.params.id;
  const userId = req.user?.id;

  if (!userId) throw new AppError(401, 'Unauthorized');

  const { answers } = req.body;

  const result = await psychometricAttemptService.tryAgainPsychometricAttempt(
    testId!,
    userId,
    answers,
  );

  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: 'Test re-submitted successfully',
    data: result,
  });
});

const getMyPsychometricAnswers = catchAsync(async (req, res) => {
  const userId = req.user?.id;
  const filters = pick(req.query, ['_id', 'year', 'searchTerm']);
  const options = pick(req.query, ['page', 'limit', 'sortBy', 'sortOrder']);

  const result = await psychometricAttemptService.getMyPsychometricAnswers(
    userId,
    filters,
    options,
  );

  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: 'Your test answers retrieved successfully',
    meta: result.meta,
    data: result.data,
  });
});

const myOverallScore = catchAsync(async (req, res) => {
  const userId = req.user?.id;
  const result = await psychometricAttemptService.myOverallResult(userId);
  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: 'Overall score retrieved successfully',
    data: result,
  });
});

const getSinglePsychometricAttempt = catchAsync(async (req, res) => {
  const { id } = req.params;
  const result = await psychometricAttemptService.getSinglePsychometricAttempt(
    id!,
  );
  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: 'Test answers retrieved successfully',
    data: result,
  });
});

export const psychometricAttemptController = {
  submitPsychometricTest,
  tryAgainPsychometricAttempt,
  getMyPsychometricAnswers,
  myOverallScore,
  getSinglePsychometricAttempt,
};
