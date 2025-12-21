import AppError from '../../error/appError';
import User from '../user/user.model';
import { IPsychometricResult } from './psychometricResult.interface';
import PsychometricResult from './psychometricResult.model';
import PsychometricTest from '../psychometricTest/psychometricTest.model';

const generatePsychometricResult = async (userId: string) => {
  const tests = await PsychometricTest.find({ user: userId }).populate('test');

  if (!tests.length) return null;

  const completedTests = tests.length;

  const avgAccuracy =
    tests.reduce((sum, t) => sum + (t.accuracyPct || 0), 0) / completedTests;

  //  skill based analysis
  const skillMap: Record<string, { correct: number; total: number }> = {};

  for (const test of tests) {
    const psychometric: any = test.test;
    if (!psychometric?.questions) continue;

    test.answers.forEach((ans: any) => {
      const q = psychometric.questions.find(
        (qq: any) => qq._id.toString() === ans.questionId.toString(),
      );

      if (!q?.skill) return;

      const skill = q.skill; // Extract to variable for type safety

      if (!skillMap[skill]) {
        skillMap[skill] = { correct: 0, total: 0 };
      }

      skillMap[skill].total += 1;
      if (ans.isCorrect) skillMap[skill].correct += 1;
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
  )}%. Focus on improving ${areasToImprove.join(', ') || 'consistency'}.`;

  // upsert result (create or update)
  const result = await PsychometricResult.findOneAndUpdate(
    { user: userId },
    {
      user: userId,
      completedTests,
      averageScore: Math.round(avgAccuracy),
      strengths,
      areasToImprove,
      aiFeedback,
    },
    { upsert: true, new: true },
  );

  return result;
};

export const psychometricResultService = {
  generatePsychometricResult,
};
