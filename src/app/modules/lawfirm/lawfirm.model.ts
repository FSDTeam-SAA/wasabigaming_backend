import mongoose from 'mongoose';
import { ILawfirm } from './lawfirm.interface';

const lawFirmSchema = new mongoose.Schema<ILawfirm>(
  {
    aboutFirm: { type: String, required: true },
    exertise: { type: String },
    internshipTraining: { type: String },
    description: { type: String, required: true },
    logo: { type: String },
    createBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    status: {
      type: String,
      enum: ['approved', 'pending', 'rejected'],
      default: 'pending',
    },
    applyNumber: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
    location: { type: String, required: true },
  },
  { timestamps: true },
);
const LawFirm = mongoose.model<ILawfirm>('LawFirm', lawFirmSchema);
export default LawFirm;
