// import pick from '../../helper/pick';
// import catchAsync from '../../utils/catchAsycn';
// import sendResponse from '../../utils/sendResponse';
// import { psychometricTestService } from './psychometricTest.service';

import pick from '../../helper/pick';
import catchAsync from '../../utils/catchAsycn';
import sendResponse from '../../utils/sendResponse';
import { psychometricTestService } from './psychometricTest.service';

// const createPsychometricTest = catchAsync(async (req, res) => {
//   const userId = req.user?.id;
//   const result = await psychometricTestService.createPsychometricTest(
//     userId,
//     req.body,
//   );

//   sendResponse(res, {
//     statusCode: 201,
//     success: true,
//     message: 'Psychometric test created successfully',
//     data: result,
//   });
// });

// const getMyAllPsychometricTests = catchAsync(async (req, res) => {
//   const userId = req.user?.id;
//   const filters = pick(req.query, ['year']);
//   const options = pick(req.query, ['limit', 'page', 'sortBy', 'sortOrder']);
//   const result = await psychometricTestService.getMyAllPsychometricTests(
//     userId,
//     filters,
//     options,
//   );

//   sendResponse(res, {
//     statusCode: 200,
//     success: true,
//     message: 'Psychometric test retrieved successfully',
//     meta: result.meta,
//     data: result.data,
//   });
// });

// const singlePsychometricTest = catchAsync(async (req, res) => {
//   const { id } = req.params;
//   const result = await psychometricTestService.singlePsychometricTest(id!);

//   sendResponse(res, {
//     statusCode: 200,
//     success: true,
//     message: 'Psychometric test retrieved successfully',
//     data: result,
//   });
// });

// const deletePsychometricTest = catchAsync(async (req, res) => {
//   const { id } = req.params;
//   const result = await psychometricTestService.deletePsychometricTest(id!);

//   sendResponse(res, {
//     statusCode: 200,
//     success: true,
//     message: 'Psychometric test deleted successfully',
//     data: result,
//   });
// });

// export const psychometricTestController = {
//   createPsychometricTest,
//   getMyAllPsychometricTests,
//   singlePsychometricTest,
//   deletePsychometricTest,
// };

//===================================update psychometricTestController ======================================

const createPsychometricTest = catchAsync(async (req, res) => {
  const userId = req.user?.id;
  const result = await psychometricTestService.createPsychometricTest(
    userId,
    req.body,
  );
  sendResponse(res, {
    statusCode: 201,
    success: true,
    message: 'Psychometric test created successfully',
    data: result,
  });
});

const getMyAllPsychometricTests = catchAsync(async (req, res) => {
  const filters = pick(req.query, [
    'searchTerm',
    'category',
    'allQuestions.question',
    'allQuestions.options',
    'allQuestions.difficulty',
  ]);
  const options = pick(req.query, ['limit', 'page', 'sortBy', 'sortOrder']);
  const result = await psychometricTestService.getAllPsychometricTests(
    filters,
    options,
  );
  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: 'Psychometric test retrieved successfully',
    meta: result.meta,
    data: result.data,
  });
});

const singlePsychometricTest = catchAsync(async (req, res) => {
  const { id } = req.params;
  const result = await psychometricTestService.getSinglePsychometricTests(id!);
  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: 'Psychometric test retrieved successfully',
    data: result,
  });
});

const updatePsychometricTests = catchAsync(async (req, res) => {
  const { id } = req.params;
  const result = await psychometricTestService.updatePsychometricTests(
    id!,
    req.body,
  );
  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: 'Psychometric test updated successfully',
    data: result,
  });
});

const deletePsychometricTest = catchAsync(async (req, res) => {
  const { id } = req.params;
  const result = await psychometricTestService.deletePsychometricTests(id!);
  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: 'Psychometric test deleted successfully',
    data: result,
  });
});

const addQusestion = catchAsync(async (req, res) => {
  const { id } = req.params;

  const result = await psychometricTestService.addQusestion(id!, req.body);
  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: 'question added successfully',
    data: result,
  });
});

const removedSingleQuestion = catchAsync(async (req, res) => {
  const { id, questionId } = req.params;
  const result = await psychometricTestService.removedSingleQuestion(
    id!,
    questionId!,
  );
  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: 'question deleted successfully',
    data: result,
  });
});

const getMyAverageScore = catchAsync(async (req, res) => {
  const userId = req.user.id;

  const result = await psychometricTestService.getUserAverageScore(userId);

  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: 'Your average psychometric test score retrieved successfully',
    data: result,
  });
});


export const psychometricTestController = {
  createPsychometricTest,
  getMyAllPsychometricTests,
  singlePsychometricTest,
  updatePsychometricTests,
  deletePsychometricTest,
  addQusestion,
  removedSingleQuestion,
  getMyAverageScore
};
