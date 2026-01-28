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

    feedback: {
      type: String,
    },

    totalScore: {
      type: Number,
    },

    wordsCompleted: {
      type: Number,
    },

    completionRate: {
      type: Number,
    },

    writingSpeed: {
      type: Number,
    },

    overallGrade: {
      type: String,
    },

    successTips: {
      type: [String],
    },

    recommendations: {
      type: [String],
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
