import mongoose, { Schema } from 'mongoose';
import { ICoverLetter } from './coverLetter.interface';

const CoverLetterSchema = new Schema<ICoverLetter>(
  {
    jobDescription: {
      type: String,
      required: true,
    },
    uploadCv: {
      type: String
    },
   applicant: {
      firstName: String,
      lastName: String,
      email: String,
      phone: String,
      location: String,
    },
    coverLetter: {
      subject: String,
      paragraphs: [String],
    },
    createBy: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const CoverLetter = mongoose.model<ICoverLetter>(
  'CoverLetter',
  CoverLetterSchema
);

export default CoverLetter;
