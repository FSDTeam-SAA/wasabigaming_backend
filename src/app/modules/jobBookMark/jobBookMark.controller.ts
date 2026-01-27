import pick from '../../helper/pick';
import catchAsync from '../../utils/catchAsycn';
import sendResponse from '../../utils/sendResponse';
import { jobBookmarkService } from './jobBookMark.service';

const addJobBookmark = catchAsync(async (req, res) => {
  const userId = req.user.id;
  const { jobId } = req.body;

  const result = await jobBookmarkService.addJobBookmark(userId, jobId);

  sendResponse(res, {
    statusCode: 201,
    success: true,
    message: 'Job bookmarked successfully',
    data: result,
  });
});

const removeJobBookmark = catchAsync(async (req, res) => {
  const userId = req.user.id;
  const { id } = req.params;

  const result = await jobBookmarkService.removeJobBookmark(userId, id!);

  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: 'Job bookmark removed successfully',
    data: result,
  });
});

const getAllBookmarks = catchAsync(async (req, res) => {
  const userId = req.user.id;
  const options = pick(req.query, ['limit', 'page', 'sortBy', 'sortOrder']);
  const result = await jobBookmarkService.getAllBookmarks(userId, options);

  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: 'Bookmarked jobs retrieved successfully',
    data: result,
  });
});
export const jobBookmarkController = {
  addJobBookmark,
  removeJobBookmark,
  getAllBookmarks
};
