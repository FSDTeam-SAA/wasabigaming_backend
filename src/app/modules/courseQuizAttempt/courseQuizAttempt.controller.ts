import catchAsync from '../../utils/catchAsycn';
import sendResponse from '../../utils/sendResponse';
import { courseQuizAttemptService } from './courseQuizAttempt.service';

const submitCourseQuiz = catchAsync(async (req, res) => {
  const userId = req.user!.id;
  const { courseId, videoId } = req.params;
  const { answers } = req.body;

  const result = await courseQuizAttemptService.submitCourseQuiz(
    userId,
    courseId!,
    videoId!,
    answers,
  );

  sendResponse(res, {
    statusCode: 201,
    success: true,
    message: 'Video quiz submitted successfully',
    data: result,
  });
});

export const courseQuizAttemptController = {
  submitCourseQuiz,
};
