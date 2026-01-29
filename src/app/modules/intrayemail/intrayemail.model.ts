import mongoose from 'mongoose';
import { IIntrayemail } from './intrayemail.interface';

const intrayemailSchema = new mongoose.Schema<IIntrayemail>(
  {
    aiassigmentId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Aiassessment',
    },

    discribtion: {
      type: String,
      trim: true,
    },

    question: {
      type: String,
      trim: true,
    },

    yourResponse: {
      type: String,
    },

    prioritization: {
      type: String,
    },

    commercialAwarness: {
      type: String,
    },

    contextUnderstanding: {
      type: String,
    },

    judgment: {
      type: String,
    },

    riskAssessment: {
      type: String,
    },

    applicant: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
    },
  },
  {
    timestamps: true,
  },
);

const Intrayemail = mongoose.model<IIntrayemail>(
  'Intrayemail',
  intrayemailSchema,
);

export default Intrayemail;
