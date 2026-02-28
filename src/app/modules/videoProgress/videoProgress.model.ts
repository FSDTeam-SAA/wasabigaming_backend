import { Schema, model, Types } from 'mongoose';

export interface IVideoProgress {
  user: Types.ObjectId;
  course: Types.ObjectId;
  video: Types.ObjectId; // courseVideo subdoc _id
  isCompleted: boolean;
  completedAt?: Date;
}

const videoProgressSchema = new Schema<IVideoProgress>(
  {
    user: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true,
      index: true,
    },
    course: {
      type: Schema.Types.ObjectId,
      ref: 'Course',
      required: true,
      index: true,
    },
    video: { type: Schema.Types.ObjectId, required: true, index: true },
    isCompleted: { type: Boolean, default: false },
    completedAt: { type: Date },
  },
  { timestamps: true },
);

videoProgressSchema.index({ user: 1, course: 1, video: 1 }, { unique: true });

const VideoProgress = model<IVideoProgress>(
  'VideoProgress',
  videoProgressSchema,
);
export default VideoProgress;
