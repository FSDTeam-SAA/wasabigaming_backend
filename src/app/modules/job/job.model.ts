import mongoose, { Schema, model, Types } from 'mongoose';
import { IJob } from './job.interface';

const jobSchema = new Schema<IJob>(
  {
    title: { type: String, required: true },
    location: { type: String, required: true },
    companyName: { type: String, required: true },
    companyType: { type: String, required: true },
    postedBy: { type: String, required: true },
    level: { type: String },
    salaryRange: { type: String, required: true },
    startDate: { type: Date, required: true },
    applicationDeadline: { type: Date, required: true },
    jobId: { type: Schema.Types.Mixed, required: true, unique: true }, // string | number
    jobStatus: { type: String, enum: ['Open', 'Closed'], required: true },
    description: { type: String, required: true },
    responsibilities: { type: [String], default: [] },
    additionalInfo: { type: String },
    status: { type: String, enum: ['active', 'inactive'], default: 'inactive' },
    createBy: { type: Types.ObjectId, ref: 'User' },
  },
  { timestamps: true },
);

const Job = model<IJob>('Job', jobSchema);

export default Job;
