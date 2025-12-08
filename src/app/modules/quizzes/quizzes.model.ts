import mongoose from 'mongoose';
import { IQuizzes } from './quizzes.interface';

const quizzesSchema = new mongoose.Schema<IQuizzes>(
  {
    title: { type: String, required: true },
    course: { type: mongoose.Schema.Types.ObjectId, ref: 'Course' },
    numberQuestions: { type: Number, required: true },
    duration: { type: Number, required: true },
    status: { type: String, enum: ['active', 'draft'], default: 'draft' },
    createBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    attempts: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
    questions: { type: String, required: true },
  },
  { timestamps: true },
);
const Quizzes = mongoose.model<IQuizzes>('Quizzes', quizzesSchema);
export default Quizzes;
