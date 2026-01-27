import mongoose from "mongoose";
import { IJobBookmark } from "./jobBookMark.interface";

const jobBookmarkSchema = new mongoose.Schema<IJobBookmark>(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    job: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Job',
      required: true,
    },
  },
  { timestamps: true }
);

jobBookmarkSchema.index({ user: 1, job: 1 }, { unique: true });

export const JobBookmark = mongoose.model<IJobBookmark>(
  'JobBookmark',
  jobBookmarkSchema
);
