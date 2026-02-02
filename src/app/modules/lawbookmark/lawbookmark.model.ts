import mongoose from 'mongoose';
import { IBookmark } from './lawbookmark.interface';

const bookmarkSchema = new mongoose.Schema<IBookmark>(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    bookmarkedLaws: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Lawfirm' }],
  },
  { timestamps: true },
);

const Bookmark = mongoose.model<IBookmark>('Bookmark', bookmarkSchema);
export default Bookmark;
