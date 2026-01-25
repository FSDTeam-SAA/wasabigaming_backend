import mongoose, { Schema } from 'mongoose';
import { IMockInterview } from './mockInterview.interface';

const mockInterviewSchema = new Schema<IMockInterview>(
  {
    title: { type: String },
    role: { type: String},
    duration: { type: String },
    description: { type: String },
    instruction: [{ type: String }],

    interviewer_crushed: { type: Number, default: 0 },

    communication_and_clarity: { type: Number, min: 0, max: 10 },
    problem_solving: { type: Number, min: 0, max: 10 },
    professionalism_and_presence: { type: Number, min: 0, max: 10 },

    feedback: {
      communication_and_clarity: { type: String },
      commercial_awareness: { type: String },
      problem_solving: { type: String },
      professionalism_and_presence: { type: String },
    },

    questions: {
      type: [String],
      default: [],
    },

    score: { type: String, default: "0/0" },
    category: { type: String },

    status: {
      type: String,
      default: 'available',
    },

    createdBy: {
      type: Schema.Types.ObjectId,
      ref: 'User',
    },
  },
  {
    timestamps: true,
  },
);

const MockInterview = mongoose.model<IMockInterview>(
  'MockInterview',
  mockInterviewSchema,
);

export default MockInterview;
