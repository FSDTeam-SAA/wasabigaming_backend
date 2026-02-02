import AppError from '../../error/appError';
import pagination, { IOption } from '../../helper/pagenation';
import Lawfirm from '../lawfirm/lawfirm.model';
import User from '../user/user.model';
import Bookmark from './lawbookmark.model';

const addBookmark = async (userId: string, lawfirmId: string) => {
  const user = await User.findById(userId);
  if (!user) throw new AppError(404, 'User not found');

  const lawfirm = await Lawfirm.findById(lawfirmId);
  if (!lawfirm) throw new AppError(404, 'Lawfirm not found');

  const result = await Bookmark.findOneAndUpdate(
    { userId },
    {
      $addToSet: { bookmarkedLaws: lawfirmId },
    },
    {
      new: true,
      upsert: true,
    },
  );
  await lawfirm.updateOne({ $addToSet: { bookmarkedUser: userId } });

  return result;
};

const getUserAllBookmark = async (userId: string, options: IOption) => {
  const { page, limit, skip } = pagination(options);

  const result = await Bookmark.findOne({ userId }).populate('bookmarkedLaws');

  if (!result || !result.bookmarkedLaws) {
    return {
      data: null,
      meta: {
        page,
        limit,
        total: 0,
      },
    };
  }

  const paginatedBookmarks = result.bookmarkedLaws.slice(skip, skip + limit);

  return {
    data: {
      ...result.toObject(),
      bookmarkedLaws: paginatedBookmarks,
    },
    meta: {
      page,
      limit,
      total: result.bookmarkedLaws.length,
    },
  };
};

const getSingleUserBookmark = async (userId: string, lawfirmId: string) => {
  const result = await Bookmark.findOne({
    userId,
    bookmarkedLaws: lawfirmId,
  }).populate('bookmarkedLaws');

  return result;
};

const removeBookmark = async (userId: string, lawfirmId: string) => {
  const result = await Bookmark.findOneAndUpdate(
    { userId },
    {
      $pull: { bookmarkedLaws: lawfirmId },
    },
    { new: true },
  );

  await Lawfirm.findByIdAndUpdate(lawfirmId, {
    $pull: { bookmarkedUser: userId },
  });

  return result;
};

export const bookmarkService = {
  addBookmark,
  getUserAllBookmark,
  getSingleUserBookmark,
  removeBookmark,
};
