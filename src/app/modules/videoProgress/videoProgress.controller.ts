import catchAsync from '../../utils/catchAsycn';
import sendResponse from '../../utils/sendResponse';
import { courseProgressService } from './videoProgress.service';


const markCompleted = catchAsync(async (req, res) => {
  const userId = req.user?.id;
  const { courseId, videoId } = req.params;

  const progress = await courseProgressService.markVideoCompleted(
    userId,
    courseId!,
    videoId!,
  );

  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: 'Video marked as completed',
    data: progress,
  });
});

export const courseProgressController = { markCompleted };
