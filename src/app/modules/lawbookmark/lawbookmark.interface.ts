import { Types } from 'mongoose';

export interface IBookmark {
  userId?: Types.ObjectId;
  bookmarkedLaws?: Types.ObjectId[];
}
