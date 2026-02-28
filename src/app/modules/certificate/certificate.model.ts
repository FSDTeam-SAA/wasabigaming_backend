import { Schema, model, Types } from 'mongoose';

export interface ICertificate {
  user: Types.ObjectId;
  course: Types.ObjectId;
  certificateId: string;
  issuedAt: Date;
  pdfUrl: string;
  s3Key: string;
}

const certificateSchema = new Schema<ICertificate>(
  {
    user: { type: Schema.Types.ObjectId, ref: 'User', required: true, index: true },
    course: { type: Schema.Types.ObjectId, ref: 'Course', required: true, index: true },
    certificateId: { type: String, required: true, unique: true, index: true },
    issuedAt: { type: Date, required: true, default: Date.now },
    pdfUrl: { type: String, required: true },
    s3Key: { type: String, required: true },
  },
  { timestamps: true }
);

certificateSchema.index({ user: 1, course: 1 }, { unique: true });

const Certificate = model<ICertificate>('Certificate', certificateSchema);
export default Certificate;