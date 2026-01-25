import mongoose from 'mongoose';
import { IAppliedJOb } from './appliedJob.interface';

const appliedJobSchema = new mongoose.Schema<IAppliedJOb>(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    cv: { type: String, required: true },
    jobId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Job',
      required: true,
    },
    coverLetter:{type:String},
  },
  { timestamps: true },
);

const AppliedJob = mongoose.model<IAppliedJOb>('AppliedJob', appliedJobSchema);
export default AppliedJob;
