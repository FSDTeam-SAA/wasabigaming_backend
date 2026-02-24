import mongoose from 'mongoose';
import { ICv } from './cv.interface';

const cvSchema = new mongoose.Schema<ICv>(
  {
    applicationId: { type: mongoose.Schema.Types.ObjectId, ref: 'Job' },
    studentId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    cvUrl: { type: String },
  },
  { timestamps: true },
);
const Cv = mongoose.model<ICv>('Cv', cvSchema);
export default Cv;
