import mongoose from 'mongoose';
import { IAiassessment } from './aiassessment.interface';

const aiassessmentSchema = new mongoose.Schema<IAiassessment>(
  {
    logo: {
      type: String,
    },

    title: {
      type: String,
    },

    discription: {
      type: String,
    },

    duration: {
      type: Number,
    },
    type: {
      type: String,
    },

    status: {
      type: String,
      enum: ['PENDING', 'AVAILABLE', 'COMPLETED'],
      default: 'PENDING',
      required: true,
    },
    applicationUser: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
      },
    ],
  },
  { timestamps: true },
);

const Aiassessment = mongoose.model<IAiassessment>(
  'Aiassessment',
  aiassessmentSchema,
);

export default Aiassessment;
