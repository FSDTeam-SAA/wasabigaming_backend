import AppError from '../../error/appError';
import User from '../user/user.model';
import Psychometric from '../psychometric/psychometric.model';
import PsychometricTest from './psychometricTest.model';
import { IPsychometricTest } from './psychometricTest.interface';
import { psychometricResultService } from '../psychometricResult/psychometricResult.service';
import pagination, { IOption } from '../../helper/pagenation';

const createPsychometricTest = async (
  userId: string,
  payload: IPsychometricTest,
) => {
  const user = await User.findById(userId);
  if (!user) throw new AppError(404, 'User not found');

  const psychometric = await Psychometric.findById(payload.test);
  if (!psychometric) throw new AppError(404, 'Psychometric test not found');

  const questions = psychometric.questions;
  let score = 0;

  const checkedAnswers = payload.answers.map((ans: any) => {
    const originalQuestion = questions.find(
      (q: any) => q._id.toString() === ans.questionId,
    );
    if (!originalQuestion) throw new AppError(400, 'Invalid questionId');

    const isCorrect = originalQuestion.correctAnswer === ans.userAnswer;
    if (isCorrect) score++;

    return {
      questionId: ans.questionId,
      userAnswer: ans.userAnswer,
      isCorrect,
      timeTakenSec: ans.timeTakenSec || 0,
    };
  });

  const total = questions.length;
  const accuracyPct = Math.round((score / total) * 100);

  const testResult = await PsychometricTest.create({
    user: user._id,
    test: payload.test,
    answers: checkedAnswers,
    score,
    total,
    accuracyPct,
  });

  //  AUTO RESULT CREATE / UPDATE
  await psychometricResultService.generatePsychometricResult(
    user._id.toString(),
  );

  return testResult;
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
    .sort({ [sortBy]: sortOrder } as any);

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
  const result = await PsychometricTest.findById(id);
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
