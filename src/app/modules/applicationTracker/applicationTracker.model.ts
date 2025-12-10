import mongoose from 'mongoose';
import { IApplicationTracker } from './applicationTracker.interface';

const applicationTrackerSchema = new mongoose.Schema<IApplicationTracker>(
  {
    schoolName: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    applicationType: {
      type: String,
      required: true,
    },
    description: {
      type: String,
    },
    status: {
      type: String,
      enum: ['approved', 'pending', 'in review', 'rejected'],
      default: 'pending',
    },
    createBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
    },
  },
  { timestamps: true },
);

const ApplicationTracker = mongoose.model<IApplicationTracker>(
  'ApplicationTracker',
  applicationTrackerSchema,
);
export default ApplicationTracker;
