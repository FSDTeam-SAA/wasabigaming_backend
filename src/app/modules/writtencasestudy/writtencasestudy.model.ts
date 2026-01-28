import mongoose, { Schema, Types } from 'mongoose';
import { IWrittencasestudy } from './writtencasestudy.interface';

const writtencasestudySchema = new Schema<IWrittencasestudy>(
  {
    aiassigmentId: {
      type: Types.ObjectId,
      ref: 'Aiassessment',
      required: true,
    },
    roleContext: {
      type: String,
    },

    ventaraAutomotive: {
      type: String,
    },

    yourManager: {
      type: String,
    },

    yourResponse: {
      type: String,
    },

    feedback: {
      type: String,
    },

    totalScore: {
      type: Number,
      min: 0,
      max: 100,
    },

    wordsCompleted: {
      type: Number,
      min: 0,
    },

    completionRate: {
      type: Number,
      min: 0,
      max: 100,
    },

    writingSpeed: {
      type: Number,
      min: 0,
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
      type: Types.ObjectId,
      ref: 'User',
    },
  },
  {
    timestamps: true,
  },
);

const Writtencasestudy = mongoose.model<IWrittencasestudy>(
  'Writtencasestudy',
  writtencasestudySchema,
);

export default Writtencasestudy;
