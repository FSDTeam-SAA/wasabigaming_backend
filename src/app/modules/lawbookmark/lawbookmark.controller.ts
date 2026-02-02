import pick from '../../helper/pick';
import catchAsync from '../../utils/catchAsycn';
import sendResponse from '../../utils/sendResponse';
import { bookmarkService } from './lawbookmark.service';

const addBookmark = catchAsync(async (req, res) => {
  const userId = req.user?.id;
  const { bookmarkedLaws } = req.body;
  const result = await bookmarkService.addBookmark(userId, bookmarkedLaws);

  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: 'Bookmark added successfully!',
    data: result,
  });
});

const getAllBookmarks = catchAsync(async (req, res) => {
  const userId = req.user?.id;
  const options = pick(req.query, ['limit', 'page', 'sortBy', 'sortOrder']);
  const result = await bookmarkService.getUserAllBookmark(userId, options);

  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: 'Bookmarks fetched successfully!',
    meta: result.meta,
    data: result.data,
  });
});

const getSingleUserBookmark = catchAsync(async (req, res) => {
  const userId = req.user?.id;
  const { lawfirmId } = req.params;

  console.log(lawfirmId)

  const result = await bookmarkService.getSingleUserBookmark(
    userId,
    lawfirmId!,
  );
  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: 'Bookmark fetched successfully!',
    data: result,
  });
});

const removeBookmark = catchAsync(async (req, res) => {
  const userId = req.user?.id;
  const { lawfirmId } = req.params;
  const result = await bookmarkService.removeBookmark(userId, lawfirmId!);

  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: 'Bookmark removed successfully!',
    data: result,
  });
});

export const bookmarkController = {
  addBookmark,
  getAllBookmarks,
  getSingleUserBookmark,
  removeBookmark,
};
