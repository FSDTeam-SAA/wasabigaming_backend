import { IMockInterviewSession } from './mockInterviewSession.interface';
import AppError from '../../error/appError';
import pagination, { IOption } from '../../helper/pagenation';
import { mockInterviewAnswerCheck, mockInterviewQuestionGenerate } from '../../helper/aiEndpoint';
import MockInterviewSession from './mockInterviewSession.model';
import { fileUploader } from '../../helper/fileUploder';

const createMockInterviewSession = async (
  payload: IMockInterviewSession
) => {
  const session = await MockInterviewSession.create({
    userId: payload.userId,
    category: payload.category,
    questionNumber: payload.questionNumber,
  });
  const aiApiCall = await mockInterviewQuestionGenerate(
    payload.category,
    Number(payload.questionNumber) 
  );

//   let questionsArray: {
//     questionText: string;
//     order: number;
//   }[] = [];

  if (!aiApiCall) {
    return { session, aiApiCall: [] };
  }
  const questionsArray = Array.isArray(aiApiCall)
    ? aiApiCall.map((q, index) => ({
        questionText: q.question,
        order: index + 1,
      }))
    : [
        {
          questionText: aiApiCall,
          order: 1,
        },
      ];

  session.questions = questionsArray;
  await session.save();

  return { session };
};
const getAllMockInterviewSessions = async (
  userId: string,
  options: IOption
) => {
  const { page, limit, skip, sortBy, sortOrder } = pagination(options);

  const whereCondition: any = { userId };

  const result = await MockInterviewSession.find(whereCondition)
    .skip(skip)
    .limit(limit)
    .sort({ [sortBy]: sortOrder } as any);

  const total = await MockInterviewSession.countDocuments(whereCondition);

  return {
    data: result,
    meta: {
      total,
      page,
      limit,
    },
  };
};

const getMockInterviewSessionById = async (id: string) => {
  const session = await MockInterviewSession.findById(id);

  if (!session) {
    throw new AppError(404, 'Mock interview session not found');
  }

  // Extract all question scores
  const questionScores = session.answers.map(a => a.aiResult?.score || 0);

  // Calculate session average score
  const sessionAverageScore =
    questionScores.length > 0
      ? Number(
          (questionScores.reduce((a, b) => a + b, 0) / questionScores.length).toFixed(2)
        )
      : 0;

  // // Add averageScore to finalResult
  // const sessionData = session.toObject();
  // sessionData.finalResult = {
  //   ...sessionData.finalResult,
  //   averageScore: sessionAverageScore
  // };
  return { session, sessionAverageScore };
};

const updateMockInterviewSession = async (
  id: string,
  payload: Partial<IMockInterviewSession>
) => {
  const session = await MockInterviewSession.findById(id);

  if (!session) {
    throw new AppError(404, 'Mock interview session not found');
  }

  const updatedSession = await MockInterviewSession.findByIdAndUpdate(
    id,
    payload,
    { new: true, runValidators: true }
  );

  return updatedSession;
};

const deleteMockInterviewSessionById = async (id: string) => {
  const session = await MockInterviewSession.findByIdAndDelete(id);

  if (!session) {
    throw new AppError(404, 'Mock interview session not found');
  }

  return session;
};
const submitAnswer = async (payload: any, userId: string) => {
  const {
    sessionId,
    questionIndex,
    question,
    segment,
    videoFile,
  } = payload;

  const session = await MockInterviewSession.findById(sessionId);
  if (!session) {
    throw new AppError(404, 'Mock interview session not found');
  }

  const startTime = new Date();

  const aiResult = await mockInterviewAnswerCheck(
    question,
    segment,
    videoFile.buffer,
    videoFile.originalname
  );

  if (!aiResult) {
    throw new AppError(500, 'AI failed to analyze answer');
  }

  const endTime = new Date();
  const uploadedVideo = await fileUploader.uploadToCloudinary(videoFile);

  const MAX_SCORE = 100;
  const normalize = (value: number) => (value / MAX_SCORE) * 10;

  const score =
    (
      normalize(aiResult.text.interview_crushed) +
      normalize(aiResult.text.communication_and_clarity) +
      normalize(aiResult.text.commercial_awareness) +
      normalize(aiResult.text.problem_solving) +
      normalize(aiResult.text.professionalism_and_presence)
    ) / 5;

  const finalScore = Number(score.toFixed(2));

  const answerPayload = {
    questionIndex,
    videoUrl: uploadedVideo.url,
    startTime,
    endTime,
    aiResult: {
      score: finalScore,
      interview_crushed: aiResult.text.interview_crushed,
      communication_and_clarity: aiResult.text.communication_and_clarity,
      commercial_awareness: aiResult.text.commercial_awareness,
      problem_solving: aiResult.text.problem_solving,
      professionalism_and_presence: aiResult.text.professionalism_and_presence,
      feedback: aiResult.text.feedback || {},
    },
  };

  const index = session.answers.findIndex(
    a => a.questionIndex === questionIndex
  );

  if (index !== -1) {
    session.answers[index] = answerPayload;
  } else {
    session.answers.push(answerPayload);
  }

  await session.save();
  return session.answers;
};


const getAverageScoresWithFeedback = async (sessionId: string) => {
  const session = await MockInterviewSession.findById(sessionId);

  if (!session) {
    throw new AppError(404, 'Mock interview session not found');
  }

  if (!session.answers || session.answers.length === 0) {
    throw new AppError(400, 'No answers submitted yet');
  }

  const totals = {
    interview_crushed: 0,
    communication_and_clarity: 0,
    commercial_awareness: 0,
    problem_solving: 0,
    professionalism_and_presence: 0,
  };

  const feedback = {
    strength: [] as string[],
    areas_for_improvement: [] as string[],
  };

  let count = 0;

  session.answers.forEach(answer => {
    const ai = answer.aiResult;
    if (!ai) return;

    totals.interview_crushed += ai.interview_crushed ?? 0;
    totals.communication_and_clarity += ai.communication_and_clarity ?? 0;
    totals.commercial_awareness += ai.commercial_awareness ?? 0;
    totals.problem_solving += ai.problem_solving ?? 0;
    totals.professionalism_and_presence += ai.professionalism_and_presence ?? 0;

    if (ai.feedback?.strength) {
      feedback.strength.push(ai.feedback.strength);
    }

    if (ai.feedback?.areas_for_improvement) {
      feedback.areas_for_improvement.push(ai.feedback.areas_for_improvement);
    }

    count++;
  });

  const averageScores = {
    interview_crushed: Number((totals.interview_crushed / count).toFixed(2)),
    communication_and_clarity: Number((totals.communication_and_clarity / count).toFixed(2)),
    commercial_awareness: Number((totals.commercial_awareness / count).toFixed(2)),
    problem_solving: Number((totals.problem_solving / count).toFixed(2)),
    professionalism_and_presence: Number((totals.professionalism_and_presence / count).toFixed(2)),
  };

  return {
    sessionId,
    totalAnsweredQuestions: count,
    averageScores,
    feedback,
  };
};

export const mockInterviewSessionService = {
  createMockInterviewSession,
  getAllMockInterviewSessions,
  getMockInterviewSessionById,
  updateMockInterviewSession,
  deleteMockInterviewSessionById,
  submitAnswer,
  getAverageScoresWithFeedback
};
