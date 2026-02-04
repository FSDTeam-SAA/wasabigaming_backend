import mongoose, { Types } from 'mongoose';
import { IPresentationTask } from './presentationtask.interface';

const presentationTaskSchema = new mongoose.Schema<IPresentationTask>(
  {
    aiassigmentId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Aiassessment',
    },
    ventaraMobility: {
      type: String,
    },
    keyObject: {
      type: [String],
    },
    proTip: {
      type: [String],
    },
    yourResponse: {
      type: String,
    },
    feedback: {
      type: [String],
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

const PresentationTask = mongoose.model<IPresentationTask>(
  'PresentationTask',
  presentationTaskSchema,
);

export default PresentationTask;
