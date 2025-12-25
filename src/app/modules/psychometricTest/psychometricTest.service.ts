import AppError from '../../error/appError';
import User from '../user/user.model';
import Psychometric from '../psychometric/psychometric.model';
import PsychometricTest from './psychometricTest.model';
import { IPsychometricTest } from './psychometricTest.interface';
import { psychometricResultService } from '../psychometricResult/psychometricResult.service';
import pagination, { IOption } from '../../helper/pagenation';

// const createPsychometricTest = async (
//   userId: string,
//   payload: IPsychometricTest,
// ) => {
//   const user = await User.findById(userId);
//   if (!user) throw new AppError(404, 'User not found');

//   const psychometric = await Psychometric.findById(payload.test);
//   if (!psychometric) throw new AppError(404, 'Psychometric test not found');

//   const questions = psychometric.questions;
//   let score = 0;

//   const checkedAnswers = payload.answers.map((ans: any) => {
//     const originalQuestion = questions.find(
//       (q: any) => q._id.toString() === ans.questionId,
//     );
//     if (!originalQuestion) throw new AppError(400, 'Invalid questionId');

//     const isCorrect = originalQuestion.correctAnswer === ans.userAnswer;
//     if (isCorrect) score++;

//     return {
//       questionId: ans.questionId,
//       userAnswer: ans.userAnswer,
//       isCorrect,
//       timeTakenSec: ans.timeTakenSec || 0,
//     };
//   });

//   const total = questions.length;
//   const accuracyPct = Math.round((score / total) * 100);

//   const testResult = await PsychometricTest.create({
//     user: user._id,
//     test: payload.test,
//     answers: checkedAnswers,
//     score,
//     total,
//     accuracyPct,
//   });

//   //  AUTO RESULT CREATE / UPDATE
//   await psychometricResultService.generatePsychometricResult(
//     user._id.toString(),
//   );

//   return testResult;
// };

// const createPsychometricTest = async (
//   userId: string,
//   payload: IPsychometricTest,
// ) => {
//   const user = await User.findById(userId);
//   if (!user) throw new AppError(404, 'User not found');

//   const psychometric = await Psychometric.findById(payload.test);
//   if (!psychometric) throw new AppError(404, 'Psychometric test not found');

//   if (!payload.answers?.length) {
//     throw new AppError(400, 'Answers are required');
//   }

//   let score = 0;

//   const checkedAnswers = payload.answers.map((ans: any) => {
//     const originalQuestion = psychometric.questions.find(
//       (q: any) => q._id.toString() === ans.questionId.toString(),
//     );

//     if (!originalQuestion) {
//       throw new AppError(400, `Invalid questionId: ${ans.questionId}`);
//     }

//     const isCorrect =
//       originalQuestion.correctAnswer === ans.userAnswer;

//     if (isCorrect) score++;

//     return {
//       questionId: ans.questionId,
//       userAnswer: ans.userAnswer,
//       isCorrect,
//       timeTakenSec: ans.timeTakenSec ?? 0,
//     };
//   });

//   const total = psychometric.questions.length;
//   const accuracyPct = Number(((score / total) * 100).toFixed(2));

//   const testResult = await PsychometricTest.create({
//     user: user._id,
//     test: psychometric._id,
//     answers: checkedAnswers,
//     score,
//     total,
//     accuracyPct,
//   });

//   await psychometricResultService.generatePsychometricResult(
//     user._id.toString(),
//   );

//   return testResult;
// };

const createPsychometricTest = async (
  userId: string,
  payload: IPsychometricTest,
) => {
  const user = await User.findById(userId);
  if (!user) throw new AppError(404, 'User not found');

  const psychometric: any = await Psychometric.findById(payload.test);
  if (!psychometric) throw new AppError(404, 'Psychometric test not found');

  if (!payload.answers?.length) {
    throw new AppError(400, 'Answers are required');
  }

  let score = 0;
  let totalTime = 0;
  let timePressureErrors = 0;

  const difficultyBreakdown = {
    easyQuestions: 0,
    mediumQuestions: 0,
    hardQuestions: 0,
  };

  const correctedAnswers = {
    totalCorrectedAnswers: 0,
    easyCorrectedAnswers: 0,
    mediumCorrectedAnswers: 0,
    hardCorrectedAnswers: 0,
  };

  const checkedAnswers = payload.answers.map((ans: any) => {
    const question = psychometric.questions.find(
      (q: any) => q._id.toString() === ans.questionId.toString(),
    );

    if (!question) {
      throw new AppError(400, 'Invalid questionId');
    }

    const isCorrect = question.correctAnswer === ans.userAnswer;

    // ✅ difficulty count (total questions)
    if (question.difficulty === 'easy') difficultyBreakdown.easyQuestions++;
    if (question.difficulty === 'medium') difficultyBreakdown.mediumQuestions++;
    if (question.difficulty === 'hard') difficultyBreakdown.hardQuestions++;

    if (isCorrect) {
      score++;
      correctedAnswers.totalCorrectedAnswers++;

      if (question.difficulty === 'easy')
        correctedAnswers.easyCorrectedAnswers++;
      if (question.difficulty === 'medium')
        correctedAnswers.mediumCorrectedAnswers++;
      if (question.difficulty === 'hard')
        correctedAnswers.hardCorrectedAnswers++;
    }

    totalTime += ans.timeTakenSec || 0;

    // ⏱ time pressure logic
    if (!isCorrect && (ans.timeTakenSec || 0) < 10) {
      timePressureErrors++;
    }

    return {
      questionId: ans.questionId,
      userAnswer: ans.userAnswer,
      isCorrect,
      timeTakenSec: ans.timeTakenSec || 0,
    };
  });

  const totalQuestions = psychometric.questions.length;
  const accuracyPct = Number(((score / totalQuestions) * 100).toFixed(2));
  const avgTimeSec = Number((totalTime / payload.answers.length).toFixed(2));

  // const testResult = await PsychometricTest.create({
  //   user: user._id,
  //   test: psychometric._id,
  //   answers: checkedAnswers,

  //   testScore: score,
  //   totalQuestions,
  //   accuracyPct,

  //   timeAnalysis: {
  //     avgTimeSec,
  //     timePressureErrors,
  //   },

  //   difficultyBreakdown,
  //   correctedAnswers,
  // });

  const testResult = await PsychometricTest.create({
    user: user._id,
    test: psychometric._id,
    answers: checkedAnswers,
    testScore: score,
    totalQuestions,
    accuracyPct,
    timeAnalysis: {
      avgTimeSec,
      timePressureErrors,
    },
    difficultyBreakdown,
    correctedAnswers,
  });

  // 🔁 auto update overall result
  await psychometricResultService.generatePsychometricResult(
    user._id.toString(),
  );

  // 🔥 populate test title
  const populatedResult = await PsychometricTest.findById(testResult._id)
    .populate('test', 'title')
    .lean();

  return populatedResult;

  // return testResult;
};

const getMyAllPsychometricTests = async (
  userId: string,
  params: any,
  options: IOption,
) => {
  const user = await User.findById(userId);
  if (!user) throw new AppError(404, 'User not found');

  const { page, limit, skip, sortBy, sortOrder } = pagination(options);
  const { year } = params;

  const andCondition: any[] = [];

  if (user.role !== 'admin') {
    andCondition.push({ user: user._id });
  }

  // YEAR Filter → createdAt
  if (year) {
    const startDate = new Date(`${year}-01-01T00:00:00.000Z`);
    const endDate = new Date(`${year}-12-31T23:59:59.999Z`);

    andCondition.push({
      createdAt: {
        $gte: startDate,
        $lte: endDate,
      },
    });
  }

  const whereCondition = andCondition.length > 0 ? { $and: andCondition } : {};

  const result = await PsychometricTest.find(whereCondition)
    .skip(skip)
    .limit(limit)
    .sort({ [sortBy]: sortOrder } as any)
    .populate('test')
    .populate('user', 'name email profileImage');

  if (!result) {
    throw new AppError(404, 'PsychometricTest not found');
  }

  const total = await PsychometricTest.countDocuments(whereCondition);

  return {
    data: result,
    meta: {
      total,
      page,
      limit,
    },
  };
};

const singlePsychometricTest = async (id: string) => {
  const result = await PsychometricTest.findById(id)
    .populate('test', 'title')
    .populate('user', 'name email profileImage');
  if (!result) {
    throw new AppError(404, 'PsychometricTest not found');
  }

  return result;
};

const deletePsychometricTest = async (id: string) => {
  const result = await PsychometricTest.findByIdAndDelete(id);
  if (!result) {
    throw new AppError(404, 'PsychometricTest not found');
  }

  return result;
};

export const psychometricTestService = {
  createPsychometricTest,
  getMyAllPsychometricTests,
  singlePsychometricTest,
  deletePsychometricTest,
};
