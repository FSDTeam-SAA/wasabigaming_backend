// import mongoose from 'mongoose';
// import { IPsychometricResult } from './psychometricResult.interface';

import mongoose from 'mongoose';
import { IPsychometricResult } from './psychometricResult.interface';

// const psychometricResultSchema = new mongoose.Schema<IPsychometricResult>(
//   {
//     user: {
//       type: mongoose.Schema.Types.ObjectId,
//       ref: 'User',
//       required: true,
//     },
//     completedTests: {
//       type: Number,
//       required: true,
//     },
//     averageScore: {
//       type: Number,
//       required: true,
//     },
//     strengths: {
//       type: [String],
//       required: true,
//     },
//     areasToImprove: {
//       type: [String],
//       required: true,
//     },
//     aiFeedback: {
//       type: String,
//       required: true,
//     },
//   },
//   { timestamps: true },
// );
// const PsychometricResult = mongoose.model<IPsychometricResult>(
//   'PsychometricResult',
//   psychometricResultSchema,
// );
// export default PsychometricResult;

const psychometricResultSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
      unique: true,
    },
    completedTests: { type: Number, required: true },
    averageAccuracy: { type: Number, required: true },
    strengths: { type: [String], required: true },
    areasToImprove: { type: [String], required: true },
    aiFeedback: { type: String, required: true },
  },
  { timestamps: true },
);

const PsychometricResult = mongoose.model<IPsychometricResult>(
  'PsychometricResult',
  psychometricResultSchema,
);
export default PsychometricResult;
