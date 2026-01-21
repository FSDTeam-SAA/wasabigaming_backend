import mongoose from 'mongoose';

const quizAnswerSchema = new mongoose.Schema(
  {
    quiz: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Quizzes',
      required: true,
    },
    userAnswer: {
      type: String,
      required: true,
    },
    isCorrect: {
      type: Boolean,
      required: true,
    },
  },
  { _id: false },
);

const courseQuizAttemptSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    course: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Course',
      required: true,
    },
    video: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'CourseVideo',
      required: true,
    },
    quizzes: {
      type: [quizAnswerSchema], // ✅ multiple quizzes
      required: true,
    },
    score: {
      type: Number,
      default: 0,
    },
  },
  { timestamps: true },
);

export const CourseQuizAttempt = mongoose.model(
  'CourseQuizAttempt',
  courseQuizAttemptSchema,
);
