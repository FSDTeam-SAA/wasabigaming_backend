import AppError from '../../error/appError';
import User from '../user/user.model';
import { IPsychometricResult } from './psychometricResult.interface';
import PsychometricResult from './psychometricResult.model';
import PsychometricTest from '../psychometricTest/psychometricTest.model';
import pagination, { IOption } from '../../helper/pagenation';

// const generatePsychometricResult = async (userId: string) => {
//   const tests = await PsychometricTest.find({ user: userId }).populate('test');

//   if (!tests.length) return null;

//   const completedTests = tests.length;

//   const avgAccuracy =
//     tests.reduce((sum, t) => sum + (t.accuracyPct || 0), 0) / completedTests;

//   //  skill based analysis
//   const skillMap: Record<string, { correct: number; total: number }> = {};

//   for (const test of tests) {
//     const psychometric: any = test.test;
//     if (!psychometric?.questions) continue;

//     test.answers.forEach((ans: any) => {
//       const q = psychometric.questions.find(
//         (qq: any) => qq._id.toString() === ans.questionId.toString(),
//       );

//       if (!q?.skill) return;

//       const skill = q.skill; // Extract to variable for type safety

//       if (!skillMap[skill]) {
//         skillMap[skill] = { correct: 0, total: 0 };
//       }

//       skillMap[skill].total += 1;
//       if (ans.isCorrect) skillMap[skill].correct += 1;
//     });
//   }

//   const strengths: string[] = [];
//   const areasToImprove: string[] = [];

//   Object.entries(skillMap).forEach(([skill, data]) => {
//     const pct = (data.correct / data.total) * 100;
//     pct >= 70 ? strengths.push(skill) : areasToImprove.push(skill);
//   });

//   const aiFeedback = `You completed ${completedTests} tests with an average accuracy of ${Math.round(
//     avgAccuracy,
//   )}%. Focus on improving ${areasToImprove.join(', ') || 'consistency'}.`;

//   // upsert result (create or update)
//   const result = await PsychometricResult.findOneAndUpdate(
//     { user: userId },
//     {
//       user: userId,
//       completedTests,
//       averageScore: Math.round(avgAccuracy),
//       strengths,
//       areasToImprove,
//       aiFeedback,
//     },
//     { upsert: true, new: true },
//   );

//   return result;
// };

const generatePsychometricResult = async (userId: string) => {
  const tests = await PsychometricTest.find({ user: userId }).populate('test');
  if (!tests.length) return null;

  const completedTests = tests.length;

  const avgAccuracy =
    tests.reduce((sum, t) => sum + (t.accuracyPct || 0), 0) / completedTests;

  const skillMap: Record<string, { correct: number; total: number }> = {};

  for (const test of tests) {
    const psychometric: any = test.test;
    if (!psychometric?.questions?.length) continue;

    test.answers.forEach((ans: any) => {
      const q = psychometric.questions.find(
        (qq: any) => qq._id.toString() === ans.questionId.toString(),
      );

      if (!q?.skill) return;

      const skill = q.skill; // Extract skill to ensure type safety

      if (!skillMap[skill]) {
        skillMap[skill] = { correct: 0, total: 0 };
      }

      skillMap[skill].total++;
      if (ans.isCorrect) skillMap[skill].correct++;
    });
  }

  const strengths: string[] = [];
  const areasToImprove: string[] = [];

  Object.entries(skillMap).forEach(([skill, data]) => {
    const pct = (data.correct / data.total) * 100;
    pct >= 70 ? strengths.push(skill) : areasToImprove.push(skill);
  });

  const aiFeedback = `You completed ${completedTests} tests with an average accuracy of ${Math.round(
    avgAccuracy,
  )}%. Focus on improving ${
    areasToImprove.join(', ') || 'overall consistency'
  }.`;

  return PsychometricResult.findOneAndUpdate(
    { user: userId },
    {
      user: userId,
      completedTests,
      averageAccuracy: Math.round(avgAccuracy),
      strengths,
      areasToImprove,
      aiFeedback,
    },
    { upsert: true, new: true },
  );
};

const getMyAllPsychometricResults = async (
  userId: string,
  params: any,
  options: IOption,
) => {
  const user = await User.findById(userId);
  if (!user) throw new AppError(404, 'User not found');

  const { page, limit, skip, sortBy, sortOrder } = pagination(options);
  const { searchTerm, year, ...filterData } = params;

  const andCondition: any[] = [];

  if (user.role !== 'admin') {
    andCondition.push({ user: user._id });
  }

  const userSearchableFields = ['aiFeedback', 'areasToImprove', 'strengths'];

  if (searchTerm) {
    andCondition.push({
      $or: userSearchableFields.map((field) => ({
        [field]: { $regex: searchTerm, $options: 'i' },
      })),
    });
  }

  if (Object.keys(filterData).length) {
    andCondition.push({
      $and: Object.entries(filterData).map(([field, value]) => ({
        [field]: value,
      })),
    });
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

  const result = await PsychometricResult.find(whereCondition)
    .skip(skip)
    .limit(limit)
    .sort({ [sortBy]: sortOrder } as any);

  if (!result) {
    throw new AppError(404, 'Psychometric Result not found');
  }

  const total = await PsychometricResult.countDocuments(whereCondition);

  return {
    data: result,
    meta: {
      total,
      page,
      limit,
    },
  };
};

const singlePsychometricResult = async (id: string) => {
  const result = await PsychometricResult.findById(id);

  if (!result) {
    throw new AppError(404, 'Psychometric Result not found');
  }

  return result;
};

const deletePsychometricResult = async (id: string) => {
  const result = await PsychometricResult.findByIdAndDelete(id);

  if (!result) {
    throw new AppError(404, 'Psychometric Result not found');
  }

  return result;
};

export const psychometricResultService = {
  generatePsychometricResult,
  getMyAllPsychometricResults,
  singlePsychometricResult,
  deletePsychometricResult,
};
