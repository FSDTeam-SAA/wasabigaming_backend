import { Types } from 'mongoose';

export interface IPsychometric {
  title: string;
  description: string;
  durationMin: number;
  type: string;

  questions: {
    question: string;
    options: string[];
    correctAnswer: string;
    difficulty: 'easy' | 'medium' | 'hard';
    skill: string;
  }[];
  status?: 'active' | 'inactive';
  createdBy?: Types.ObjectId;
}
