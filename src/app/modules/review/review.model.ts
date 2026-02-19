import mongoose from 'mongoose';
import { IReview } from './review.interface';

const reviewSchema = new mongoose.Schema<IReview>(
  {
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    courseId: { type: mongoose.Schema.Types.ObjectId, ref: 'Course' },
    rating: { type: Number },
    comment: { type: String },
  },
  { timestamps: true },
);

const Review = mongoose.model<IReview>('Review', reviewSchema);
export default Review;
