import AppError from '../../error/appError';
import Course from '../course/course.model';
import Quizzes from '../quizzes/quizzes.model';
import { CourseQuizAttempt } from './courseQuizAttempt.model';

const submitCourseQuiz = async (
  userId: string,
  courseId: string,
  videoId: string,
  answers: { quizId: string; userAnswer: string }[],
) => {
  if (!answers || !Array.isArray(answers) || answers.length === 0) {
    throw new AppError(400, 'Answers are required');
  }

  // 🔹 course + video validation
  const course = await Course.findById(courseId);
  if (!course) throw new AppError(404, 'Course not found');

  const videoExists = course.courseVideo?.some(
    (v: any) => v._id.toString() === videoId,
  );
  if (!videoExists) {
    throw new AppError(400, 'Video not found in this course');
  }

  // 🔹 already submitted check
  const alreadySubmitted = await CourseQuizAttempt.findOne({
    user: userId,
    video: videoId,
  });

  if (alreadySubmitted) {
    throw new AppError(400, 'You already submitted quiz for this video');
  }

  // 🔹 fetch quizzes
  const quizIds = answers.map((a) => a.quizId);

  const quizzes = await Quizzes.find({
    _id: { $in: quizIds },
    courseId,
    videoId,
    status: 'active',
  });

  if (quizzes.length !== answers.length) {
    throw new AppError(400, 'Invalid quiz submission');
  }

  let score = 0;

  const evaluatedQuizzes = answers.map((ans) => {
    const quiz = quizzes.find(
      (q) => q._id.toString() === ans.quizId,
    );

    if (!quiz) {
      throw new AppError(404, 'Quiz not found');
    }

    const isCorrect = quiz.answer === ans.userAnswer;
    if (isCorrect) score++;

    return {
      quiz: quiz._id,
      userAnswer: ans.userAnswer,
      correctAnswer:quiz.answer,
      isCorrect,
    };
  });

  const attempt = await CourseQuizAttempt.create({
    user: userId,
    course: courseId,
    video: videoId,
    quizzes: evaluatedQuizzes,
    score,
  });

  return attempt;
};

export const courseQuizAttemptService = {
  submitCourseQuiz,
};
