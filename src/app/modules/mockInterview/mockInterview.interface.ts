import { Types } from 'mongoose';

export interface IMockInterview {
  title: string;
  role: string;
  duration: string;
  description: string;
  instruction: string[];

  interviewer_crushed: number;

  communication_and_clarity: number;
  problem_solving: number;
  professionalism_and_presence: number;

  feedback: {
    communication_and_clarity: string;
    commercial_awareness: string;
    problem_solving: string;
    professionalism_and_presence: string;
  };

  score: string;
  category: string;

  status: string;

  createdBy?: Types.ObjectId;
}
