import mongoose from 'mongoose';
import { IWebsite } from './website.interface';

const SectionSchema = new mongoose.Schema<IWebsite>(
  {
    key: { type: String, required: true, unique: true, index: true },
    type: { type: String, required: true },
    title: { type: String },
    content: { type: mongoose.Schema.Types.Mixed, default: {} },
    meta: { type: mongoose.Schema.Types.Mixed, default: {} },
    createBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
  },
  { timestamps: true },
);

const Website = mongoose.model<IWebsite>('Website', SectionSchema);
export default Website;
