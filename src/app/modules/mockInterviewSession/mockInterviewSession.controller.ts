import catchAsync from '../../utils/catchAsycn';
import sendResponse from '../../utils/sendResponse';
import pick from '../../helper/pick';
import { mockInterviewSessionService } from './mockInterviewSession.service';
import AppError from '../../error/appError';

// Create session
const createMockInterviewSession = catchAsync(async (req, res) => {
  const payload = req.body;
  const userId = req.user.id;

  const result = await mockInterviewSessionService.createMockInterviewSession({
    ...payload,
    userId,
  });

  sendResponse(res, {
    statusCode: 201,
    success: true,
    message: 'Mock interview session created successfully',
    data: result,
  });
});

// Get all sessions for user
const getAllMockInterviewSessions = catchAsync(async (req, res) => {
  const userId = req.user.id;
  const options = pick(req.query, ['limit', 'page', 'sortBy', 'sortOrder']);

  const result = await mockInterviewSessionService.getAllMockInterviewSessions(
    userId,
    options
  );

  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: 'Mock interview sessions retrieved successfully',
    data: result,
  });
});

// Get session by ID
const getMockInterviewSessionById = catchAsync(async (req, res) => {
  const id = req.params.id;

  const result = await mockInterviewSessionService.getMockInterviewSessionById(id!);

  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: 'Mock interview session retrieved successfully',
    data: result,
  });
});

// Update session (answers, status, AI results)
const updateMockInterviewSession = catchAsync(async (req, res) => {
  const id = req.params.id;

  const result = await mockInterviewSessionService.updateMockInterviewSession(
    id!,
    req.body
  );

  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: 'Mock interview session updated successfully',
    data: result,
  });
});

// Delete session
const deleteMockInterviewSessionById = catchAsync(async (req, res) => {
  const id = req.params.id;

  const result = await mockInterviewSessionService.deleteMockInterviewSessionById(id!);

  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: 'Mock interview session deleted successfully',
    data: result,
  });
});


// const submitMockAnswer = catchAsync(async (req, res) => {
//   const { sessionId, questionIndex, question, segment } = req.body;
//   const videoFile = req.file;

//   if (!videoFile) {
//     throw new AppError(400, 'Video is required');
//   }

//   const result = await mockInterviewSessionService.submitAnswer(
//     {
//       sessionId,
//       questionIndex: Number(questionIndex),
//       question,
//       segment,
//       videoPath: videoFile.path,
//     },
//     req.user.id
//   );

//     sendResponse(res, {
//         statusCode: 200,
//         success: true,
//         message: 'Mock test start successfully',
//         data: result,
//     });
// });

const submitMockAnswer = catchAsync(async (req, res) => {
  const { sessionId, questionIndex, question, segment } = req.body;
  const videoFile = req.file;
  // if (!videoFile) {
  //   throw new AppError(400, 'Video is required');
  // }

  const result = await mockInterviewSessionService.submitAnswer(
    {
      sessionId,
      questionIndex: Number(questionIndex),
      question,
      segment,
      videoFile: videoFile, 
    },
    req.user.id
  );

    sendResponse(res, {
        statusCode: 200,
        success: true,
        message: 'Mock test start successfully',
        data: result,
    });
});

export const mockInterviewSessionController = {
  createMockInterviewSession,
  getAllMockInterviewSessions,
  getMockInterviewSessionById,
  updateMockInterviewSession,
  deleteMockInterviewSessionById,
  submitMockAnswer
};
