import { Types } from 'mongoose';

export interface ICourse {
  name: string;
  description: string;
  gradeLevel?: string;
  category?: string;
  courseVideo?: {
    title: string;
    url:string;
    time: string;
  }[];
  createdBy?: Types.ObjectId;
  status?: 'active' | 'inactive';
  enrolledStudents?: Types.ObjectId[];
}
