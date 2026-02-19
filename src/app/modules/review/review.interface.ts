import { Types } from 'mongoose';

export interface IReview {
  userId: Types.ObjectId;
  courseId: Types.ObjectId;
  rating: number;
  comment: string;
}
