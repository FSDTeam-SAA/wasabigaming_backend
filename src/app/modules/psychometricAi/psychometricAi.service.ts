import AppError from '../../error/appError';
import User from '../user/user.model';
import Psychometric from '../psychometric/psychometric.model';
import PsychometricTest from '../psychometricTest/psychometricTest.model';
import { psychometricResultService } from '../psychometricResult/psychometricResult.service';

interface IAiPayload {
  session_id: string;
  user_payload: {
    user_id: string;
    test_id: string;
    test_type: string;
    performance: {
      overall: {
        score: number;
        total: number;
        accuracy_pct: number;
      };
      skill_breakdown: Record<string, number>;
      time_analysis?: {
        avg_time_sec: number;
        time_pressure_errors: number;
      };
      difficulty_breakdown?: {
        easy: number;
        medium: number;
        hard: number;
      };
    };
  };
}

export const ingestAiPsychometricResult = async (payload: IAiPayload) => {
  const { user_payload } = payload;

  const user = await User.findById(user_payload.user_id);
  if (!user) throw new AppError(404, 'User not found');

  const test = await Psychometric.findById(user_payload.test_id);
  if (!test) throw new AppError(404, 'Psychometric test not found');

  const { performance } = user_payload;

  const psychometricTest = await PsychometricTest.create({
    user: user._id,
    test: test._id,
    score: performance.overall.score,
    total: performance.overall.total,
    accuracyPct: performance.overall.accuracy_pct,

    timeAnalysis: performance.time_analysis
      ? {
          avgTimeSec: performance.time_analysis.avg_time_sec,
          timePressureErrors:
            performance.time_analysis.time_pressure_errors,
        }
      : undefined,

    difficultyBreakdown: performance.difficulty_breakdown,
  });

  // 🔥 AUTO RESULT GENERATE
  await psychometricResultService.generatePsychometricResult(
    user._id.toString(),
  );

  return psychometricTest;
};
