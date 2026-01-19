// import mongoose from 'mongoose';
// import { IQuizzes } from './quizzes.interface';

import mongoose from 'mongoose';
import { IQuizzes } from './quizzes.interface';

// const quizzesSchema = new mongoose.Schema<IQuizzes>(
//   {
//     title: { type: String, required: true },
//     course: { type: mongoose.Schema.Types.ObjectId, ref: 'Course' },
//     numberQuestions: { type: Number, required: true },
//     duration: { type: Number, required: true },
//     status: { type: String, enum: ['active', 'draft'], default: 'draft' },
//     createBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
//     attempts: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
//     questions: { type: String, required: true },
//   },
//   { timestamps: true },
// );
// const Quizzes = mongoose.model<IQuizzes>('Quizzes', quizzesSchema);
// export default Quizzes;

const quizzesSchema = new mongoose.Schema<IQuizzes>(
  {
    courseId: { type: mongoose.Schema.Types.ObjectId, ref: 'Course' },
    videoId: { type: mongoose.Schema.Types.ObjectId },
    title: { type: String, required: true },
    options: [{ type: String, default: [] }],
    answer: { type: String, default: '' },
    userAnswer: { type: String, default: '' },
    score: { type: Number, default: 0 },
    isCorrect: { type: Boolean, default: false },
    userId: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
    status: { type: String, enum: ['active', 'draft'], default: 'active' },
  },
  { timestamps: true },
);

const Quizzes = mongoose.model<IQuizzes>('Quizzes', quizzesSchema);
export default Quizzes;
